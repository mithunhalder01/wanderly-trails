import type { NextApiRequest, NextApiResponse } from "next";

// NOTE: This file is for Next.js apps only.
// Your project is Vite (vercel.json says framework: vite), so API routes must be implemented in a serverless function.
// This placeholder is intentionally not used.

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(501).json({ ok: false, error: "API not implemented in Vite SPA. Create a Vercel Function instead." });
}

