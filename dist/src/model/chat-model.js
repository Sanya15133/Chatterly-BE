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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChat = exports.findChatsByUser = exports.findChats = void 0;
const mongoose_1 = require("mongoose");
const connect_1 = __importDefault(require("../connect"));
const chatSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const Chat = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Chat;
// const newMessage = new Chat({
//   name: "Guest",
//   message: "Testing DB",
//   date: Date.now(),
// });
function findChats() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, connect_1.default)();
        return yield Chat.find().then((chats) => {
            return chats;
        });
    });
}
exports.findChats = findChats;
function findChatsByUser(name) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, connect_1.default)();
        return yield Chat.find({ name: name }).then((chats) => {
            if (chats.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: "Cannot find messages for this user",
                });
            }
            console.log({ chats });
            return chats;
        });
    });
}
exports.findChatsByUser = findChatsByUser;
function addChat(name, message, date) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, connect_1.default)();
        if (!name) {
            return Promise.reject({
                status: 400,
                msg: "Missing name parameter",
            });
        }
        if (!message) {
            return Promise.reject({
                status: 400,
                msg: "Missing message parameter",
            });
        }
        if (message.length < 5) {
            return Promise.reject({ status: 400, msg: "Message needs to be longer" });
        }
        return Chat.create({ name, message, date }).then((chat) => {
            console.log({ chat });
            return chat;
        });
    });
}
exports.addChat = addChat;
