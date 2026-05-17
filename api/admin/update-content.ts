/* eslint-disable */
// @ts-nocheck
import { promises as fs } from "fs";
import path from "path";

const apiDir = new URL(".", import.meta.url).pathname;
const repoRoot = path.resolve(apiDir, "../..");
const contentPath = path.join(repoRoot, "src", "data", "content.json");

function getAuthToken(req: any) {
  const url = new URL(req?.url ?? "", "http://localhost");
  const headerToken = req?.headers?.get?.("authorization") || "";
  const tokenFromHeader = headerToken.startsWith("Bearer ") ? headerToken.slice(7) : null;
  const tokenFromQuery = url.searchParams.get("token");
  return tokenFromHeader || tokenFromQuery;
}

export default async function handler(req: any, res: any) {
  if (req?.method?.toUpperCase() !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const token = getAuthToken(req);
    const expected = process.env.CONTENT_ADMIN_TOKEN;

    if (expected && token !== expected) {
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }

    const body = req?.body ?? (await req.json?.().catch(() => null));
    if (!body || typeof body !== "object") {
      return res.status(400).json({ ok: false, error: "Invalid payload" });
    }

    await fs.writeFile(contentPath, JSON.stringify(body, null, 2), "utf-8");
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: "Update failed" });
  }
}
