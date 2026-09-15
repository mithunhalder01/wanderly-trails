import mongoose from "mongoose";
import { config } from "./config";

let memoryServer: { stop: () => Promise<boolean> } | null = null;

/**
 * Vercel serverless har request pe naya function instance nahi banata (warm reuse
 * hota hai), lekin module-level state process restart pe reset ho jata hai — isliye
 * connection ko globalThis pe cache karte hain taaki baar-baar reconnect na ho aur
 * Atlas ke connection limit se na takraye.
 */
declare global {
  // eslint-disable-next-line no-var
  var __wtMongoConn: Promise<typeof mongoose> | undefined;
}

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose;
  if (global.__wtMongoConn) return global.__wtMongoConn;

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

  global.__wtMongoConn = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 10_000,
      maxPoolSize: config.isServerless ? 5 : 10,
      bufferCommands: false,
    })
    .then((conn) => {
      console.log(`[db] connected (${memoryServer ? "memory" : "mongodb"})`);
      return conn;
    })
    .catch((err) => {
      global.__wtMongoConn = undefined; // fail hua to next request phir try kare
      throw err;
    });

  return global.__wtMongoConn;
}

export async function disconnectDb() {
  await mongoose.disconnect();
  global.__wtMongoConn = undefined;
  if (memoryServer) await memoryServer.stop();
}
