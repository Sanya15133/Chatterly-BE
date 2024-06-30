import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const url: string | undefined = process.env.MONGODB_URI;

function connectMongoose() {
  if (!url) {
    console.error("Missing MONGODB_URI environment variable");
    process.exit(1);
  }

  mongoose.connect(url, {
  } as mongoose.ConnectOptions);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log("Connected to MongoDB using Mongoose!");
  });
}

connectMongoose();

export default connectMongoose;