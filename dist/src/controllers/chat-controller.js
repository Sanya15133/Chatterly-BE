"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChatByUser = exports.insertChats = exports.getChatsByUser = exports.getChats = void 0;
const chat_model_1 = require("../model/chat-model");
function getChats(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, chat_model_1.findChats)()
            .then((chats) => {
            res.status(200).send({ chats });
        })
            .catch((error) => {
            next(error);
        });
    });
}
exports.getChats = getChats;
function getChatsByUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.params;
        return yield (0, chat_model_1.findChatsByUser)(name)
            .then((chats) => {
            res.status(200).send({ chats });
        })
            .catch((error) => {
            next(error);
        });
    });
}
exports.getChatsByUser = getChatsByUser;
function insertChats(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, message } = req.body;
        return yield (0, chat_model_1.addChat)(name, message)
            .then((chat) => {
            res.status(201).send({ chat });
        })
            .catch((error) => {
            next(error);
        });
    });
}
exports.insertChats = insertChats;
function deleteChatByUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.params;
        return yield (0, chat_model_1.findChatToDelete)(name).then((chat) => {
            res.status(204).send({ chat });
        });
    });
}
exports.deleteChatByUser = deleteChatByUser;
