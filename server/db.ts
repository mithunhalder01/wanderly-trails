import mongoose from "mongoose";
import { config } from "./config";

let memoryServer: { stop: () => Promise<boolean> } | null = null;

export async function connectDb() {
  mongoose.set("strictQuery", true);
  // Unknown fields DB me na jayein — schema ke bahar ka data chupchaap drop ho jata hai
  mongoose.set("strict", true);

  let uri = config.mongoUri;

  if (!uri) {
    if (!config.allowMemoryDb) {
      throw new Error("MONGODB_URI missing. Set it in .env (MongoDB Atlas ka connection string).");
    }
    // Dev fallback: bina Atlas ke bhi kaam chal jaye. Data restart pe udd jata hai.
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mem = await MongoMemoryServer.create({
      instance: { launchTimeout: 120_000, dbName: "wanderly" },
      // 8.x macOS 14+ maangta hai; 7.0 purane Mac pe bhi chalta hai
      binary: { version: process.env.MONGOMS_VERSION ?? "7.0.14" },
    });
    memoryServer = mem;
    uri = mem.getUri("wanderly");
    console.warn("[db] MONGODB_URI not set — using in-memory MongoDB (data is NOT persisted).");
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10_000,
    maxPoolSize: 10,
  });
  console.log(`[db] connected (${memoryServer ? "memory" : "mongodb"})`);
}

export async function disconnectDb() {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
}
