"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatRouter = require('express').Router();
const Chat = require('../model/chat-model');
const chat_controller_1 = require("../controllers/chat-controller");
chatRouter.get('/', chat_controller_1.getChats);
module.exports = chatRouter;
