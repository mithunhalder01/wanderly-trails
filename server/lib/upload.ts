import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import multer from "multer";
import sharp from "sharp";
import { config } from "../config";
import { HttpError } from "../middleware/validate";

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const PDF_TYPE = "application/pdf";
const VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);

/** Memory me lo — image ko sharp se re-encode karke hi disk pe likhte hain. */
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.maxUploadMb * 1024 * 1024, files: 1 },
  fileFilter(_req, file, cb) {
    if (IMAGE_TYPES.has(file.mimetype) || file.mimetype === PDF_TYPE || VIDEO_TYPES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new HttpError(415, "Only images (jpg/png/webp/gif/avif), PDF and mp4/webm allowed"));
    }
  },
});

export async function ensureUploadDir() {
  await fs.mkdir(path.join(config.uploadDir, "images"), { recursive: true });
  await fs.mkdir(path.join(config.uploadDir, "pdf"), { recursive: true });
  await fs.mkdir(path.join(config.uploadDir, "video"), { recursive: true });
}

function randomName() {
  return `${Date.now().toString(36)}-${crypto.randomBytes(6).toString("hex")}`;
}

/** Magic bytes check — mimetype client bhejta hai, us pe bharosa nahi. */
function looksLikePdf(buf: Buffer) {
  return buf.subarray(0, 5).toString("latin1") === "%PDF-";
}

export interface StoredFile {
  url: string;
  kind: "image" | "pdf" | "video";
  filename: string;
  size: number;
  width?: number;
  height?: number;
}

export async function storeFile(file: Express.Multer.File): Promise<StoredFile> {
  await ensureUploadDir();

  if (file.mimetype === PDF_TYPE) {
    if (!looksLikePdf(file.buffer)) throw new HttpError(415, "File is not a valid PDF");
    const filename = `${randomName()}.pdf`;
    await fs.writeFile(path.join(config.uploadDir, "pdf", filename), file.buffer);
    return { url: `/uploads/pdf/${filename}`, kind: "pdf", filename, size: file.size };
  }

  if (VIDEO_TYPES.has(file.mimetype)) {
    const ext = file.mimetype === "video/webm" ? "webm" : "mp4";
    const filename = `${randomName()}.${ext}`;
    await fs.writeFile(path.join(config.uploadDir, "video", filename), file.buffer);
    return { url: `/uploads/video/${filename}`, kind: "video", filename, size: file.size };
  }

  // Image: sharp se decode + re-encode → embedded scripts/EXIF/bombs sab strip.
  // GIF ko animated rakhne ke liye webp me animated encode.
  let pipeline = sharp(file.buffer, { animated: file.mimetype === "image/gif", limitInputPixels: 50_000_000 });
  const meta = await pipeline.metadata().catch(() => {
    throw new HttpError(415, "File is not a valid image");
  });
  const MAX = 2400;
  if ((meta.width ?? 0) > MAX || (meta.height ?? 0) > MAX) {
    pipeline = pipeline.resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true });
  }
  const buffer = await pipeline.rotate().webp({ quality: 82 }).toBuffer();
  const out = await sharp(buffer).metadata();
  const filename = `${randomName()}.webp`;
  await fs.writeFile(path.join(config.uploadDir, "images", filename), buffer);
  return {
    url: `/uploads/images/${filename}`,
    kind: "image",
    filename,
    size: buffer.length,
    width: out.width,
    height: out.height,
  };
}

export async function deleteStoredFile(url: string) {
  // Sirf apne uploads folder ke andar hi delete — path traversal block
  if (!url.startsWith("/uploads/")) return;
  const rel = url.replace(/^\/uploads\//, "");
  const abs = path.resolve(config.uploadDir, rel);
  if (!abs.startsWith(config.uploadDir + path.sep)) return;
  await fs.unlink(abs).catch(() => undefined);
}
