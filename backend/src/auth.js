import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./config.js";
import { query } from "./db.js";

const cookieName = "webmakers_admin_token";
const tokenAgeSeconds = 60 * 60 * 8;

export function signAdminToken(admin) {
  return jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    },
    config.jwtSecret,
    { expiresIn: tokenAgeSeconds },
  );
}

export function setAuthCookie(response, token) {
  response.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: config.env === "production" ? "none" : "lax",
    secure: config.env === "production",
    maxAge: tokenAgeSeconds * 1000,
    path: "/",
  });
}

export function clearAuthCookie(response) {
  response.clearCookie(cookieName, {
    httpOnly: true,
    sameSite: config.env === "production" ? "none" : "lax",
    secure: config.env === "production",
    path: "/",
  });
}

export async function verifyAdminRequest(request, response, next) {
  try {
    const token = request.cookies?.[cookieName];
    if (!token) {
      return response.status(401).json({ error: "Authentication required" });
    }

    const payload = jwt.verify(token, config.jwtSecret);
    const result = await query(
      "SELECT id, name, email, role, status, last_login_at FROM admins WHERE id = $1 AND status = 'Active'",
      [payload.sub],
    );

    if (result.rowCount === 0) {
      return response.status(401).json({ error: "Invalid admin session" });
    }

    request.admin = result.rows[0];
    return next();
  } catch {
    return response.status(401).json({ error: "Invalid admin session" });
  }
}

export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}
