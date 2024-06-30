import mongoose, { Document, Schema, Model, model } from "mongoose";

interface IChat extends Document {
  name: string;
  message: string;
  date?: Date;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Chat: Model<IChat> = model<IChat>("Chat", chatSchema);
export default Chat;
