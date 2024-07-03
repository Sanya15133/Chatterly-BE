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
exports.findChats = void 0;
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
const newMessage = new Chat({
    name: "Guest",
    message: "Testing DB",
    date: Date.now(),
});
function testDB() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, connect_1.default)();
        newMessage.save();
    });
}
testDB();
function findChats() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, connect_1.default)();
        return yield Chat.find().then((chats) => {
            console.log(chats);
            return chats;
        });
    });
}
exports.findChats = findChats;
