import type { Model } from "mongoose";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100) || "item";
}

/**
 * Slug unique banao: "kashmir", "kashmir-2", "kashmir-3"...
 * `excludeId` update ke waqt apne aap se clash na ho isliye.
 */
export async function uniqueSlug<T extends { slug: string; id: number }>(
  model: Model<T>,
  base: string,
  excludeId?: number,
): Promise<string> {
  const root = slugify(base);
  let candidate = root;
  let n = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const filter: Record<string, unknown> = { slug: candidate };
    if (excludeId !== undefined) filter.id = { $ne: excludeId };
    const exists = await model.exists(filter);
    if (!exists) return candidate;
    candidate = `${root}-${n++}`;
  }
}
