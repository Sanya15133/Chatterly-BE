"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertChats = exports.getChatsByUser = exports.getChats = void 0;
const chat_model_1 = require("../model/chat-model");
function getChats(req, res, next) {
    return (0, chat_model_1.findChats)()
        .then((chats) => {
        res.status(200).send({ chats });
    })
        .catch((error) => {
        next(error);
    });
}
exports.getChats = getChats;
function getChatsByUser(req, res, next) {
    const { name } = req.params;
    return (0, chat_model_1.findChatsByUser)(name)
        .then((chats) => {
        res.status(200).send({ chats });
    })
        .catch((error) => {
        next(error);
    });
}
exports.getChatsByUser = getChatsByUser;
function insertChats(req, res, next) {
    const { name, message, date } = req.body;
    return (0, chat_model_1.addChat)(name, message, date)
        .then((chat) => {
        res.status(201).send({ chat });
    })
        .catch((error) => {
        next(error);
    });
}
exports.insertChats = insertChats;
