"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_controller_1 = require("../controllers/chat-controller");
const chatRouter = require("express").Router();
chatRouter.get("/", chat_controller_1.getChats);
chatRouter.get("/:name", chat_controller_1.getChatsByUser);
chatRouter.post("/", chat_controller_1.insertChats);
exports.default = chatRouter;
