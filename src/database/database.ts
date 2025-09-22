import mongoose from "mongoose";

export class MongoDB {
  public static async connect(): Promise<void> {
    try {
      await mongoose.connect("mongodb://localhost:27017/content_api");

      console.log('connected successfully')

    
    } catch (error) {
    
    console.log('connection failed', error)
      process.exit(1); 
    }
  }

  public static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    console.log('Mongo Disconnected')
    } catch (error) {
    console.log('Error disconnecting mongo DB')
    }
  }
}
