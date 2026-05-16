import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// next-app/src/app/api/admin/update-content/route.ts => go to repo root
const repoRoot = path.resolve(__dirname, "../../../../../../");
const contentPath = path.join(repoRoot, "src", "data", "content.json");


function getAuthToken(req: Request) {
  const url = new URL(req.url);
  // Prefer header, fallback to query for quick testing
  const headerToken = req.headers.get("authorization") || "";
  const tokenFromHeader = headerToken.startsWith("Bearer ") ? headerToken.slice(7) : null;
  const tokenFromQuery = url.searchParams.get("token");
  return tokenFromHeader || tokenFromQuery;
}

export async function POST(req: Request) {
  try {
    const token = getAuthToken(req);
    const expected = process.env.CONTENT_ADMIN_TOKEN;

    if (expected && token !== expected) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    // Write-through to repo file
    await fs.writeFile(contentPath, JSON.stringify(body, null, 2), "utf-8");

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Update failed" },
      { status: 500 }
    );
  }
}

