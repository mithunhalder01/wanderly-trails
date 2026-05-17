/* eslint-disable */
// @ts-nocheck
import { promises as fs } from "fs";
import path from "path";

const apiDir = new URL(".", import.meta.url).pathname;
const repoRoot = path.resolve(apiDir, "..");
const contentPath = path.join(repoRoot, "src", "data", "content.json");

export default async function handler(req: any, res: any) {
  if (req?.method && req.method.toUpperCase() !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const raw = await fs.readFile(contentPath, "utf-8");
    const parsed = JSON.parse(raw);
    return res.status(200).json({ ok: true, data: parsed });
  } catch {
    return res.status(500).json({ ok: false, error: "Content file read failed" });
  }
}
