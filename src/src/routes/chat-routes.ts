const chatRouter = require("express").Router();
const Chat = require("../model/chat-model");
import { getChats, getChatsByUser } from "../controllers/chat-controller";

chatRouter.get("/chats", getChats);
chatRouter.get("/chats/:name", getChatsByUser);

export default chatRouter;
