"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const connect_1 = __importDefault(require("./connect"));
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
app.use(express_1.default.json());
(0, connect_1.default)();
app.get("/api/users", (req, res, next) => {
    console.log(); // { name: 'new user', likes: ['coding'] }
    // logic for adding a new user
});
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
