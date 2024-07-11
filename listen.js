"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const WebSocket = __importStar(require("ws"));
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`APP is running on ${PORT}`);
});
const wss = new WebSocket.Server({ server: server });
wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (message) => {
        console.log("Received: %s", message);
        ws.send(`${message}`);
    });
    ws.on("close", function () {
        console.log("Client disconnected");
    });
});
