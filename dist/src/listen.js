"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = require("http");
const app = (0, express_1.default)();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`APP is running on ${PORT}`);
});
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
io.on("connection", (socket) => {
    console.log("a user connected");
});
