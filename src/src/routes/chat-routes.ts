import { getChats, getChatsByUser } from "../controllers/chat-controller";

const chatRouter = require("express").Router();
chatRouter.get("/", getChats);
chatRouter.get("/:name", getChatsByUser);

export default chatRouter;
