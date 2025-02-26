import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";

// 🚀 Ensure NeonDB uses `fetch()`, not WebSockets
neonConfig.poolQueryViaFetch = true;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
