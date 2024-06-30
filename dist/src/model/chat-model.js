"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
