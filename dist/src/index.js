"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const connect_js_1 = __importDefault(require("./connect.js"));
const socket_io_1 = require("socket.io");
const apiRouter = require("./apiRouter"); // Adjust the path as necessary
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const url = process.env.MONGODB_URI;
app.use(express_1.default.json());
(0, connect_js_1.default)();
app.get("/api/users", apiRouter, (req, res, next) => {
    console.log("hello"); // { name: 'new user', likes: ['coding'] }
    // logic for adding a new user
});
io.on("connection", (socket) => {
    console.log("a user connected");
});
server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
module.exports = app;
