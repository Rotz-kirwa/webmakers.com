import { spawnSync } from "node:child_process";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: "backend/.env" });
dotenv.config();

const command = process.argv[2] ?? "up";
const containerName = "webmakers-postgres-dev";
const databaseUrl =
  process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5433/webmakers";

function run(commandName, args, options = {}) {
  return spawnSync(commandName, args, {
    stdio: options.silent ? "pipe" : "inherit",
    encoding: "utf8",
  });
}

async function canConnect() {
  const client = new pg.Client({ connectionString: databaseUrl });
  try {
    await client.connect();
    return true;
  } catch {
    return false;
  } finally {
    await client.end().catch(() => null);
  }
}

async function waitForDatabase() {
  for (let attempt = 1; attempt <= 40; attempt += 1) {
    if (await canConnect()) {
      console.log("PostgreSQL is ready");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("PostgreSQL did not become ready in time");
}

function hasDocker() {
  return run("docker", ["--version"], { silent: true }).status === 0;
}

async function up() {
  if (await canConnect()) {
    console.log("Using existing PostgreSQL connection");
    return;
  }

  if (!hasDocker()) {
    throw new Error(
      "Docker is not available and PostgreSQL is not reachable. Start PostgreSQL manually or install Docker.",
    );
  }

  const started = run("docker", ["start", containerName], { silent: true });
  if (started.status !== 0) {
    const created = run("docker", [
      "run",
      "--name",
      containerName,
      "-e",
      "POSTGRES_DB=webmakers",
      "-e",
      "POSTGRES_USER=postgres",
      "-e",
      "POSTGRES_PASSWORD=postgres",
      "-p",
      "5433:5432",
      "-v",
      "webmakers_postgres_data:/var/lib/postgresql/data",
      "-d",
      "postgres:16-alpine",
    ]);
    if (created.status !== 0) {
      throw new Error("Could not start the WebMakers PostgreSQL Docker container");
    }
  } else {
    console.log(`Started existing ${containerName} container`);
  }

  await waitForDatabase();
}

function down() {
  if (!hasDocker()) {
    console.log("Docker is not available; nothing to stop");
    return;
  }
  run("docker", ["stop", containerName]);
}

try {
  if (command === "down") {
    down();
  } else {
    await up();
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
