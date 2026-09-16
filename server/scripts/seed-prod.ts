/**
 * Production DB ko ek baar seed karne ke liye — manually chalao:
 *   pnpm seed:prod
 * (MONGODB_URI .env se uthata hai). Khali collections hi bharta hai,
 * dubara chalane se kuch overwrite nahi hota.
 */
import { connectDb, disconnectDb } from "../db";
import { seedIfEmpty } from "../lib/seed";

async function main() {
  await connectDb();
  const report = await seedIfEmpty();
  console.log(Object.keys(report).length ? report : "Already seeded — nothing to do.");
  await disconnectDb();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
