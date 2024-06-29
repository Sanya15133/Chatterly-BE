import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const url: string | undefined = process.env.MONGODB_URI;

if (!url) {
  console.error("Missing MONGODB_URI environment variable");
  process.exit(1);
}

mongoose.connect(url, {
} as mongoose.ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB using Mongoose!");
});

export default mongoose;