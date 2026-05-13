import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { config } from "./config.js";
import {
  clearAuthCookie,
  setAuthCookie,
  signAdminToken,
  verifyAdminRequest,
  verifyPassword,
} from "./auth.js";
import { pool, query, withTransaction } from "./db.js";
import {
  toContentSection,
  toLead,
  toMediaAsset,
  toMessage,
  toPricingPackage,
  toServiceCategory,
} from "./mappers.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.frontendOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const publicSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const leadCreateSchema = z.object({
  name: z.string().min(1),
  business: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().optional().default(""),
  serviceType: z.string().min(1),
  packageInterest: z.string().min(1),
  budget: z.string().min(1),
  source: z.string().min(1),
  status: z.enum(["New", "Contacted", "Hot", "Closed", "Rejected"]).default("New"),
  followUp: z.string().default("Today"),
  lastMessage: z.string().min(1),
  notes: z.array(z.string()).default([]),
});

const messageCreateSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional().default(""),
  email: z.string().optional().default(""),
  subject: z.string().min(1),
  body: z.string().min(1),
  channel: z.string().min(1),
  status: z.enum(["Unread", "Replied", "Needs follow-up"]).default("Unread"),
});

const publicSubmissionSchema = z.object({
  lead: leadCreateSchema,
  message: messageCreateSchema,
});

const leadPatchSchema = z.object({
  status: z.enum(["New", "Contacted", "Hot", "Closed", "Rejected"]).optional(),
  followUp: z.string().optional(),
  notes: z.array(z.string()).optional(),
});

const messagePatchSchema = z.object({
  status: z.enum(["Unread", "Replied", "Needs follow-up"]),
});

const serviceCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  cta: z.string().min(1),
  image: z.string().optional().default("Service image"),
  status: z.enum(["Live", "Draft", "Review"]).default("Draft"),
});

const servicePatchSchema = serviceCreateSchema.partial();

const packagePatchSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.string().min(1).optional(),
  audience: z.string().min(1).optional(),
  features: z.array(z.string()).optional(),
  addons: z.array(z.string()).optional(),
  recommended: z.boolean().optional(),
  offer: z.string().optional(),
});

const contentPatchSchema = z.object({
  status: z.enum(["Live", "Draft", "Review"]).optional(),
  title: z.string().optional(),
  body: z.string().optional(),
  cta: z.string().optional(),
});

const mediaCreateSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  usage: z.string().min(1),
  size: z.string().min(1),
  url: z.string().min(1),
});

function validate(schema, request, response) {
  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Invalid request body", details: parsed.error.flatten() });
    return null;
  }
  return parsed.data;
}

async function logActivity(request, action, entityType, entityId = null, metadata = {}) {
  await query(
    "INSERT INTO activity_logs (admin_id, action, entity_type, entity_id, metadata) VALUES ($1, $2, $3, $4, $5)",
    [request.admin?.id ?? null, action, entityType, entityId, metadata],
  );
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, service: "webmakers-backend" });
});

app.post("/api/auth/login", authLimiter, async (request, response, next) => {
  try {
    const body = validate(loginSchema, request, response);
    if (!body) return;

    const result = await query(
      "SELECT id, name, email, role, status, password_hash FROM admins WHERE email = $1 AND status = 'Active'",
      [body.email.toLowerCase()],
    );

    const admin = result.rows[0];
    if (!admin || !(await verifyPassword(body.password, admin.password_hash))) {
      return response.status(401).json({ error: "Invalid admin email or password" });
    }

    await query("UPDATE admins SET last_login_at = now() WHERE id = $1", [admin.id]);
    const token = signAdminToken(admin);
    setAuthCookie(response, token);
    response.json({
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/logout", (_request, response) => {
  clearAuthCookie(response);
  response.json({ ok: true });
});

app.get("/api/auth/me", verifyAdminRequest, (request, response) => {
  response.json({ admin: request.admin });
});

app.post("/api/public/submissions", publicSubmitLimiter, async (request, response, next) => {
  try {
    const body = validate(publicSubmissionSchema, request, response);
    if (!body) return;

    const created = await withTransaction(async (client) => {
      const leadResult = await client.query(
        `INSERT INTO leads
          (client_name, business, phone, email, service_type, package_interest, budget, source, status, follow_up, last_message, notes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         RETURNING *`,
        [
          body.lead.name,
          body.lead.business,
          body.lead.phone,
          body.lead.email,
          body.lead.serviceType,
          body.lead.packageInterest,
          body.lead.budget,
          body.lead.source,
          body.lead.status,
          body.lead.followUp,
          body.lead.lastMessage,
          JSON.stringify(body.lead.notes),
        ],
      );
      const messageResult = await client.query(
        `INSERT INTO messages
          (sender_name, phone, email, subject, body, channel, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         RETURNING *`,
        [
          body.message.name,
          body.message.phone,
          body.message.email,
          body.message.subject,
          body.message.body,
          body.message.channel,
          body.message.status,
        ],
      );
      return {
        lead: toLead(leadResult.rows[0]),
        message: toMessage(messageResult.rows[0]),
      };
    });

    response.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

app.use("/api/admin", verifyAdminRequest);

function requireSuperAdmin(request, response, next) {
  if (request.admin?.role !== "Super admin") {
    return response.status(403).json({ error: "Super admin access required" });
  }
  return next();
}

app.get("/api/admin/dashboard", async (_request, response, next) => {
  try {
    const [leadCount, newLeads, messages, packageRequests] = await Promise.all([
      query("SELECT count(*)::int AS count FROM leads"),
      query("SELECT count(*)::int AS count FROM leads WHERE status = 'New'"),
      query("SELECT count(*)::int AS count FROM messages"),
      query("SELECT count(*)::int AS count FROM leads WHERE package_interest IS NOT NULL"),
    ]);
    response.json({
      metrics: [
        {
          label: "Total leads",
          value: String(leadCount.rows[0].count),
          change: "Live database",
          tone: "blue",
        },
        {
          label: "New inquiries",
          value: String(newLeads.rows[0].count),
          change: "Needs follow-up",
          tone: "red",
        },
        {
          label: "Package requests",
          value: String(packageRequests.rows[0].count),
          change: "From public forms",
          tone: "green",
        },
        {
          label: "Contact submissions",
          value: String(messages.rows[0].count),
          change: "Stored in admin",
          tone: "navy",
        },
      ],
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/leads", async (_request, response, next) => {
  try {
    const result = await query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 500");
    response.json({ leads: result.rows.map(toLead) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/leads", async (request, response, next) => {
  try {
    const body = validate(leadCreateSchema, request, response);
    if (!body) return;
    const result = await query(
      `INSERT INTO leads
        (client_name, business, phone, email, service_type, package_interest, budget, source, status, follow_up, last_message, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        body.name,
        body.business,
        body.phone,
        body.email,
        body.serviceType,
        body.packageInterest,
        body.budget,
        body.source,
        body.status,
        body.followUp,
        body.lastMessage,
        JSON.stringify(body.notes),
      ],
    );
    await logActivity(request, "Created lead", "lead", result.rows[0].id);
    response.status(201).json({ lead: toLead(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/leads/:id", async (request, response, next) => {
  try {
    const body = validate(leadPatchSchema, request, response);
    if (!body) return;
    const result = await query(
      `UPDATE leads
       SET status = COALESCE($2, status),
           follow_up = COALESCE($3, follow_up),
           notes = COALESCE($4, notes),
           updated_at = now()
       WHERE id = $1
       RETURNING *`,
      [
        request.params.id,
        body.status ?? null,
        body.followUp ?? null,
        body.notes ? JSON.stringify(body.notes) : null,
      ],
    );
    if (result.rowCount === 0) return response.status(404).json({ error: "Lead not found" });
    await logActivity(request, "Updated lead", "lead", result.rows[0].id, body);
    response.json({ lead: toLead(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/messages", async (_request, response, next) => {
  try {
    const result = await query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 500");
    response.json({ messages: result.rows.map(toMessage) });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/messages/:id", async (request, response, next) => {
  try {
    const body = validate(messagePatchSchema, request, response);
    if (!body) return;
    const result = await query(
      "UPDATE messages SET status = $2, updated_at = now() WHERE id = $1 RETURNING *",
      [request.params.id, body.status],
    );
    if (result.rowCount === 0) return response.status(404).json({ error: "Message not found" });
    await logActivity(request, "Updated message", "message", result.rows[0].id, body);
    response.json({ message: toMessage(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/services", async (_request, response, next) => {
  try {
    const result = await query("SELECT * FROM service_categories ORDER BY sort_order, name");
    response.json({ services: result.rows.map(toServiceCategory) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/services", async (request, response, next) => {
  try {
    const body = validate(serviceCreateSchema, request, response);
    if (!body) return;
    const result = await query(
      `INSERT INTO service_categories (name, description, cta, image_label, status)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [body.name, body.description, body.cta, body.image, body.status],
    );
    await logActivity(request, "Created service category", "service_category", result.rows[0].id);
    response.status(201).json({ service: toServiceCategory(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/services/:id", async (request, response, next) => {
  try {
    const body = validate(servicePatchSchema, request, response);
    if (!body) return;
    const result = await query(
      `UPDATE service_categories
       SET name = COALESCE($2, name),
           description = COALESCE($3, description),
           cta = COALESCE($4, cta),
           image_label = COALESCE($5, image_label),
           status = COALESCE($6, status),
           updated_at = now()
       WHERE id = $1
       RETURNING *`,
      [
        request.params.id,
        body.name ?? null,
        body.description ?? null,
        body.cta ?? null,
        body.image ?? null,
        body.status ?? null,
      ],
    );
    if (result.rowCount === 0) return response.status(404).json({ error: "Service not found" });
    await logActivity(
      request,
      "Updated service category",
      "service_category",
      result.rows[0].id,
      body,
    );
    response.json({ service: toServiceCategory(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/services/:id", async (request, response, next) => {
  try {
    const result = await query("DELETE FROM service_categories WHERE id = $1 RETURNING id, name", [
      request.params.id,
    ]);
    if (result.rowCount === 0)
      return response.status(404).json({ error: "Service category not found" });
    await logActivity(request, "Deleted service category", "service_category", result.rows[0].id, {
      name: result.rows[0].name,
    });
    response.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/packages", async (_request, response, next) => {
  try {
    const result = await query("SELECT * FROM pricing_packages ORDER BY sort_order, name");
    response.json({ packages: result.rows.map(toPricingPackage) });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/packages/:id", async (request, response, next) => {
  try {
    const body = validate(packagePatchSchema, request, response);
    if (!body) return;
    const result = await withTransaction(async (client) => {
      if (body.recommended === true) {
        await client.query("UPDATE pricing_packages SET recommended = false");
      }
      return client.query(
        `UPDATE pricing_packages
         SET name = COALESCE($2, name),
             price = COALESCE($3, price),
             audience = COALESCE($4, audience),
             features = COALESCE($5, features),
             addons = COALESCE($6, addons),
             recommended = COALESCE($7, recommended),
             offer = COALESCE($8, offer),
             updated_at = now()
         WHERE id = $1
         RETURNING *`,
        [
          request.params.id,
          body.name ?? null,
          body.price ?? null,
          body.audience ?? null,
          body.features ? JSON.stringify(body.features) : null,
          body.addons ? JSON.stringify(body.addons) : null,
          body.recommended ?? null,
          body.offer ?? null,
        ],
      );
    });
    if (result.rowCount === 0) return response.status(404).json({ error: "Package not found" });
    await logActivity(request, "Updated package", "pricing_package", result.rows[0].id, body);
    response.json({ package: toPricingPackage(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/content", async (_request, response, next) => {
  try {
    const result = await query("SELECT * FROM content_sections ORDER BY page, section");
    response.json({ sections: result.rows.map(toContentSection) });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/content/:id", async (request, response, next) => {
  try {
    const body = validate(contentPatchSchema, request, response);
    if (!body) return;
    const result = await query(
      `UPDATE content_sections
       SET status = COALESCE($2, status),
           title = COALESCE($3, title),
           body = COALESCE($4, body),
           cta = COALESCE($5, cta),
           updated_at = now()
       WHERE id = $1
       RETURNING *`,
      [
        request.params.id,
        body.status ?? null,
        body.title ?? null,
        body.body ?? null,
        body.cta ?? null,
      ],
    );
    if (result.rowCount === 0)
      return response.status(404).json({ error: "Content section not found" });
    await logActivity(request, "Updated content", "content_section", result.rows[0].id, body);
    response.json({ section: toContentSection(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/media", async (_request, response, next) => {
  try {
    const result = await query("SELECT * FROM media_assets ORDER BY created_at DESC");
    response.json({ assets: result.rows.map(toMediaAsset) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/media", async (request, response, next) => {
  try {
    const body = validate(mediaCreateSchema, request, response);
    if (!body) return;
    const result = await query(
      "INSERT INTO media_assets (name, asset_type, usage, size_label, url) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [body.name, body.type, body.usage, body.size, body.url],
    );
    await logActivity(request, "Created media asset", "media_asset", result.rows[0].id);
    response.status(201).json({ asset: toMediaAsset(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/activity", async (_request, response, next) => {
  try {
    const result = await query(
      "SELECT action FROM activity_logs ORDER BY created_at DESC LIMIT 20",
    );
    response.json({ activity: result.rows.map((row) => row.action) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/users", requireSuperAdmin, async (_request, response, next) => {
  try {
    const result = await query(
      `SELECT name, email, role, status, last_login_at
       FROM admins
       ORDER BY created_at DESC`,
    );
    response.json({
      users: result.rows.map((admin) => ({
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
        lastActive: admin.last_login_at
          ? new Date(admin.last_login_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Never",
      })),
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  if (error?.code === "23505") {
    return response.status(409).json({ error: "A record with this value already exists" });
  }
  response.status(500).json({ error: "Internal server error" });
});

const server = app.listen(config.port, () => {
  console.log(`WebMakers backend running on http://localhost:${config.port}`);
});

process.on("SIGTERM", async () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
