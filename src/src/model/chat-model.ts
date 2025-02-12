import mongoose, { Document, Schema, Model, model } from "mongoose";
import connectMongoose from "../connect";
import { disconnectMongoose } from "../connect";
import { AsyncLocalStorage } from "async_hooks";

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

const newMessage = new Chat({
  name: "Guest",
  message: "Testing DB",
  date: Date.now(),
});

export async function findChats() {
  await connectMongoose();
  return await Chat.find().then((chats) => {
    return chats;
  });
}

export async function findChatsByUser(name: string) {
  await connectMongoose();
  return await Chat.find({ name: name }).then((chats) => {
    if (chats.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Cannot find messages for this user",
      });
    }
    return chats;
  });
}

export async function addChat(name: string, message: string) {
  await connectMongoose();

  if (!message) {
    return Promise.reject({
      status: 400,
      msg: "Missing message parameter",
    });
  }

  if (!name) {
    return Promise.reject({
      status: 400,
      msg: "Missing name parameter",
    });
  }

  if (name.length < 3 && typeof name !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Name needs to be longer than 2 characters and should include text",
    });
  }

  if (message.length < 5 && typeof message !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Missing message parameter",
    });
  }

  if (message.length < 5) {
    return Promise.reject({
      status: 400,
      msg: "Message needs to be longer and should include text",
    });
  }
  return await Chat.create({ name, message }).then((chat) => {
    return chat;
  });
}

export async function findChatToDelete(name: string) {
  await connectMongoose();
  const result = await Chat.deleteOne({ name });
  if (result.deletedCount === 0) {
    return Promise.reject({ status: 404, msg: "No chat by this user exists" });
  }
}
