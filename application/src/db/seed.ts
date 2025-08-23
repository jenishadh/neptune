import { Pool } from "pg";
import data from "@/db.json";
import { drizzle } from "drizzle-orm/node-postgres";
import { songs } from "./schema";
import { InferInsertModel } from "drizzle-orm";

import "dotenv/config";

type SongInsert = InferInsertModel<typeof songs>;

const seedData: SongInsert[] = data.map((song, idx) => ({
  ...song,
  year: String(song.year),
}))

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  })

  const db = drizzle(pool);

  // Insert all songs
  await db.insert(songs).values(seedData);

  await pool.end();
  console.log("Seeded successfully!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});