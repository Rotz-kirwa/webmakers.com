import { config } from "../src/config.js";
import { hashPassword } from "../src/auth.js";
import { pool, query, withTransaction } from "../src/db.js";

const services = [
  [
    "Restaurants & Cafes",
    "Menus, reservations, WhatsApp ordering, food galleries, and local trust.",
    "Get my restaurant website",
    "Restaurant food gallery",
    "Live",
    38,
  ],
  [
    "Real Estate",
    "Listings, maps, property galleries, virtual tours, and buyer inquiries.",
    "Get my real estate website",
    "Property listing showcase",
    "Live",
    41,
  ],
  [
    "E-commerce",
    "Product catalogs, checkout, payments, inventory, and sales reporting.",
    "Get my online store",
    "Online store checkout",
    "Live",
    54,
  ],
  [
    "Tours & Travel",
    "Packages, destinations, itineraries, booking prompts, and trip inquiries.",
    "Get my travel website",
    "Safari destination banner",
    "Live",
    31,
  ],
  [
    "Schools & Training",
    "Admissions, course pages, announcements, galleries, and institution trust.",
    "Get my school website",
    "Student admissions page",
    "Live",
    27,
  ],
  [
    "Clinics & Healthcare",
    "Appointments, doctor profiles, services, maps, and patient support.",
    "Get my clinic website",
    "Healthcare appointment page",
    "Live",
    24,
  ],
  [
    "Salons & Beauty",
    "Service menus, booking flows, galleries, testimonials, and client support.",
    "Get my beauty website",
    "Beauty booking gallery",
    "Live",
    22,
  ],
  [
    "Car Dealers",
    "Vehicle listings, financing prompts, test drives, and buyer lead forms.",
    "Get my car dealership website",
    "Vehicle inventory page",
    "Live",
    19,
  ],
];

const packages = [
  [
    "Starter Website",
    "KSh 15,000",
    "New businesses, small service providers, side hustles, and simple profiles.",
    ["1-3 pages", "Mobile responsive", "WhatsApp button", "Basic SEO"],
    ["Google Maps", "Social links"],
    false,
    "Starter launch",
  ],
  [
    "Business Website",
    "KSh 30,000",
    "Growing local brands that need more pages, trust, and better conversion.",
    ["4-7 pages", "Service pages", "Contact form", "Testimonials", "SEO setup"],
    ["Gallery", "Basic admin updates"],
    true,
    "Best value",
  ],
  [
    "Premium Website",
    "KSh 50,000+",
    "Businesses needing bookings, payments, catalogs, dashboards, or lead workflows.",
    ["E-commerce or catalog", "Booking system", "Admin dashboard", "Analytics"],
    ["M-Pesa", "Blog", "Advanced SEO"],
    false,
    "Pro build",
  ],
  [
    "Enterprise Website",
    "KSh 100,000+",
    "Companies that need automation, AI, user roles, integrations, and scale.",
    ["Custom UI/UX", "Role-based admin", "CRM/API integrations", "Security hardening"],
    ["AI chatbot", "SMS", "Cloud deployment"],
    false,
    "Strategy call",
  ],
];

const content = [
  [
    "Homepage",
    "Hero",
    "Live",
    "Super admin",
    "Your Business Should Be Working Online 24/7",
    "Do not let customers find your competitors first.",
    "Get a Website That Works 24/7",
  ],
  ["Homepage", "Website categories", "Live", "Editor", null, null, null],
  ["Homepage", "Packages", "Live", "Super admin", null, null, null],
  ["Homepage", "Testimonials", "Review", "Editor", null, null, null],
  ["SEO", "Meta titles and descriptions", "Draft", "Super admin", null, null, null],
  ["Blog", "Small business website guide", "Draft", "Editor", null, null, null],
];

async function seed() {
  if (!config.adminEmail || !config.adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the admin user");
  }

  await withTransaction(async (client) => {
    const passwordHash = await hashPassword(config.adminPassword);
    await client.query(
      `INSERT INTO admins (name, email, password_hash, role, status)
       VALUES ($1, $2, $3, 'Super admin', 'Active')
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, status = 'Active'`,
      ["WebMakers Owner", config.adminEmail.toLowerCase(), passwordHash],
    );

    for (const [index, service] of services.entries()) {
      await client.query(
        `INSERT INTO service_categories (name, description, cta, image_label, status, inquiries, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description, cta = EXCLUDED.cta`,
        [...service, index],
      );
    }

    for (const [index, plan] of packages.entries()) {
      await client.query(
        `INSERT INTO pricing_packages (name, price, audience, features, addons, recommended, offer, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (name) DO UPDATE SET price = EXCLUDED.price, audience = EXCLUDED.audience`,
        [
          plan[0],
          plan[1],
          plan[2],
          JSON.stringify(plan[3]),
          JSON.stringify(plan[4]),
          plan[5],
          plan[6],
          index,
        ],
      );
    }

    for (const section of content) {
      await client.query(
        `INSERT INTO content_sections (page, section, status, owner, title, body, cta)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (page, section) DO NOTHING`,
        section,
      );
    }
  });

  await query("INSERT INTO activity_logs (action, entity_type) VALUES ($1, $2)", [
    "Seeded WebMakers admin database",
    "system",
  ]);
  await pool.end();
  console.log("Database seed complete");
}

seed().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
