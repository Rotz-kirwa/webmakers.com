import dotenv from "dotenv";

dotenv.config({ path: "backend/.env" });
dotenv.config();

export const config = {
  env: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  frontendOrigins: (
    process.env.FRONTEND_ORIGIN ??
    "http://localhost:8080,http://localhost:8081,http://localhost:8082"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  databaseUrl: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5433/webmakers",
  jwtSecret:
    process.env.JWT_SECRET ??
    (process.env.NODE_ENV === "production" ? undefined : "webmakers-local-dev-secret"),
  adminEmail: process.env.ADMIN_EMAIL ?? "eliudkirwa451@gmail.com",
  adminPassword:
    process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV === "production" ? undefined : "Rotz1362$"),
};

export function requireConfig() {
  const missing = [];
  if (!config.databaseUrl) missing.push("DATABASE_URL");
  if (!config.jwtSecret) missing.push("JWT_SECRET");

  if (missing.length > 0) {
    throw new Error(`Missing backend environment variables: ${missing.join(", ")}`);
  }
}
