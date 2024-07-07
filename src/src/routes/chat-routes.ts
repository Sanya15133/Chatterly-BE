import {
  getChats,
  getChatsByUser,
  insertChats,
} from "../controllers/chat-controller";

const chatRouter = require("express").Router();
chatRouter.get("/", getChats);
chatRouter.get("/:name", getChatsByUser);
chatRouter.post("/", insertChats);

export default chatRouter;
