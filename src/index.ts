import "dotenv/config";

import { sql } from "drizzle-orm";

import { db } from "./db";

async function main() {
  const result = await db.execute(sql`
    select
      current_database() as database_name,
      current_schema() as schema_name
  `);

  console.log("Connected to Neon with Drizzle:", result.rows[0]);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
