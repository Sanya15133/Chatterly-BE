import {
  getChats,
  getChatsByUser,
  insertChats,
  deleteChatByUser,
} from "../controllers/chat-controller";

const chatRouter = require("express").Router();
chatRouter.get("/", getChats);
chatRouter.get("/:name", getChatsByUser);
chatRouter.post("/", insertChats);
chatRouter.delete("/:name", deleteChatByUser);

export default chatRouter;
