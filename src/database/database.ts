import mongoose from "mongoose";
// import configuration from "../config";
// import { logger } from "../utils/logger";

export class MongoDB {
  public static async connect(): Promise<void> {
    try {
      await mongoose.connect("mongodb://localhost:27017/content_api");

      console.log('connected successfully')

    //   logger.info("=================================");
    //   logger.info("🚀 MongoDB connected successfully");
    //   logger.info("=================================");
    } catch (error) {
    //   logger.error("❌ Error connecting to MongoDB", error);
    console.log('connection failed', error)
      process.exit(1); // stop app if DB connection fails
    }
  }

  public static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    //   logger.info("🛑 MongoDB disconnected");
    console.log('Mongo Disconnected')
    } catch (error) {
    //   logger.error("❌ Error disconnecting MongoDB", error);
    console.log('Error disconnecting mongo DB')
    }
  }
}
