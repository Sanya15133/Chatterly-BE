import mongoose, { Document, Schema, Model, model } from "mongoose";
import connectMongoose from "../connect";
import { disconnectMongoose } from "../connect";

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

// const newMessage = new Chat({
//   name: "Guest",
//   message: "Testing DB",
//   date: Date.now(),
// });

export async function findChats() {
  connectMongoose();
  return await Chat.find().then((chats) => {
    return chats;
  });
}

export async function findChatsByUser(name: string) {
  connectMongoose();
  return await Chat.find({ name: name }).then((chats) => {
    if (!chats) {
      return Promise.reject({
        status: 404,
        msg: "Cannot find messages for this user",
      });
    }
    return chats;
  });
}

export async function addChat(name: string, message: string, date: string) {
  connectMongoose();

  if (!name) {
    return Promise.reject({
      status: 400,
      msg: "Missing name parameter",
    });
  }

  if (message.length < 5) {
    return Promise.reject({ status: 400, msg: "Message needs to be longer" });
  }
  return Chat.create({ name, message, date }).then((chat) => {
    return chat;
  });
}
