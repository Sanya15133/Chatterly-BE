"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const WebSocket = require("ws");
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`APP is running on ${PORT}`);
});
const wss = new WebSocket.Server({ httpServer: server });
wss.on("connection", () => (ws) => {
    console.log("Client connected");
    ws.on("message", () => (message) => {
        console.log("Received: %s", message);
        ws.send(`${message}`);
    });
    ws.on("close", function () {
        console.log("Client disconnected");
    });
});
