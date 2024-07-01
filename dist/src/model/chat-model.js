"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChat = void 0;
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
async function findChat() {
    (0, connect_1.default)();
    return await Chat.find().then((chats) => {
        console.log(chats);
        return chats;
    });
}
exports.findChat = findChat;
