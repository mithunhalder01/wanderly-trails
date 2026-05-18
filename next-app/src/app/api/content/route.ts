import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// next-app/src/app/api/content/route.ts => go to repo root
// Repo-root source of truth (backend + admin update)
const contentPath = path.join(__dirname, "../../../data/content.json");


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const raw = await fs.readFile(contentPath, "utf-8");
    const parsed = JSON.parse(raw);
    return new NextResponse(JSON.stringify({ ok: true, data: parsed }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store, max-age=0, s-maxage=0",
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Content file read failed" },
      {
        status: 500,
        headers: {
          "cache-control": "no-store, max-age=0, s-maxage=0",
        },
      }
    );
  }
}


