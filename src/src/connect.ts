import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectMongoose() {
  const url = process.env.MONGODB_URI;

  if (!url) {
    console.error("Missing MONGODB_URI environment variable");
    process.exit(1);
  }

  await mongoose.connect(url, {} as mongoose.ConnectOptions);
}

export async function disconnectMongoose() {
  await mongoose.connection.close();
}

export default connectMongoose;
