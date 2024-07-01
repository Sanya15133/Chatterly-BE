"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGODB_URI;
function connectMongoose() {
    if (!url) {
        console.error("Missing MONGODB_URI environment variable");
        process.exit(1);
    }
    mongoose_1.default.connect(url, {});
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "Connection error:"));
    db.once("open", () => {
        console.log("Connected to MongoDB using Mongoose!");
    });
}
function disconnectMongoose() {
    mongoose_1.default.connection.close();
}
connectMongoose();
exports.default = { connectMongoose, disconnectMongoose };
