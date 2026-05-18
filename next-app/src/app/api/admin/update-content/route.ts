import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Repo-root source of truth (backend + admin update)
const contentPath = path.join(__dirname, "../../../data/content.json");


function getAuthToken(req: Request) {
  const url = new URL(req.url);
  // Prefer header, fallback to query for quick testing
  const headerToken = req.headers.get("authorization") || "";
  const tokenFromHeader = headerToken.startsWith("Bearer ") ? headerToken.slice(7) : null;
  const tokenFromQuery = url.searchParams.get("token");
  return tokenFromHeader || tokenFromQuery;
}

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const token = getAuthToken(req);
    const expected = process.env.CONTENT_ADMIN_TOKEN;

    if (expected && token !== expected) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        {
          status: 401,
          headers: {
            "cache-control": "no-store, max-age=0, s-maxage=0",
          },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        {
          status: 400,
          headers: {
            "cache-control": "no-store, max-age=0, s-maxage=0",
          },
        }
      );
    }

    // NOTE: Vercel serverless filesystem is not persistent.
    // This will likely not update what GET reads after deploy/restart.
    await fs.writeFile(contentPath, JSON.stringify(body, null, 2), "utf-8");

    return NextResponse.json(
      { ok: true },
      {
        status: 200,
        headers: {
          "cache-control": "no-store, max-age=0, s-maxage=0",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Update failed" },
      {
        status: 500,
        headers: {
          "cache-control": "no-store, max-age=0, s-maxage=0",
        },
      }
    );
  }
}


