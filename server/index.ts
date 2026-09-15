import bcrypt from "bcryptjs";
import { createApp } from "./app";
import { config } from "./config";
import { connectDb, disconnectDb } from "./db";
import { seedIfEmpty } from "./lib/seed";
import { ensureUploadDir } from "./lib/upload";
import { AdminUserModel } from "./models";

/** Auth on hai but abhi koi admin user nahi — pehla owner bana do ya instructions do. */
async function ensureFirstOwner() {
  if (!config.adminAuth) return;
  if ((await AdminUserModel.countDocuments()) > 0) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password && password.length >= 10) {
    const passwordHash = await bcrypt.hash(password, 12);
    await AdminUserModel.create({ email: email.toLowerCase(), passwordHash, name: process.env.ADMIN_NAME ?? "Owner", role: "owner", active: true });
    console.log(`[auth] First owner account created: ${email}`);
  } else {
    console.warn(
      "[auth] ADMIN_AUTH is on but no admin users exist yet. Run: pnpm admin:create-user <email> <password> \"Name\"",
    );
  }
}

async function main() {
  await connectDb();
  await ensureUploadDir();
  await seedIfEmpty();
  await ensureFirstOwner();

  const app = createApp();
  const server = app.listen(config.port, () => {
    console.log(`[api] http://localhost:${config.port}  (admin auth: ${config.adminAuth ? "ON" : "off"})`);
  });

  const shutdown = async () => {
    server.close();
    await disconnectDb();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error("[api] failed to start:", err);
  process.exit(1);
});
