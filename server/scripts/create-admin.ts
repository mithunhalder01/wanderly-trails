/**
 * Admin user banane ka script (auth ON karne se pehle chalao):
 *   pnpm admin:create-user admin@wanderlytrails.in "StrongPassword123" "Owner Name"
 */
import bcrypt from "bcryptjs";
import { connectDb, disconnectDb } from "../db";
import { AdminUserModel } from "../models";

async function main() {
  const [email, password, name = "Admin"] = process.argv.slice(2);
  if (!email || !password) {
    console.error('Usage: pnpm admin:create-user <email> <password> ["Name"]');
    process.exit(1);
  }
  if (password.length < 10) {
    console.error("Password kam se kam 10 characters ka rakho.");
    process.exit(1);
  }
  await connectDb();
  const passwordHash = await bcrypt.hash(password, 12);
  const isFirst = (await AdminUserModel.countDocuments()) === 0;
  await AdminUserModel.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: { passwordHash, name, active: true }, $setOnInsert: { role: isFirst ? "owner" : "editor" } },
    { upsert: true },
  );
  console.log(`Admin user ready: ${email} (${isFirst ? "owner" : "editor"})`);
  await disconnectDb();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
