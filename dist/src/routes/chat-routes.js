"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatRouter = require("express").Router();
const Chat = require("../model/chat-model");
const chat_controller_1 = require("../controllers/chat-controller");
chatRouter.get("/chats", chat_controller_1.getChats);
chatRouter.get("/chats/:name", chat_controller_1.getChatsByUser);
exports.default = chatRouter;
