"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = void 0;
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
