import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function connectMongoose() {
  const url = process.env.MONGODB_URI;

  if (!url) {
    console.error("Missing MONGODB_URI environment variable");
    process.exit(1);
  }

  mongoose.connect(url, {} as mongoose.ConnectOptions);
}

export function disconnectMongoose() {
  mongoose.connection.close();
}

export default connectMongoose;
