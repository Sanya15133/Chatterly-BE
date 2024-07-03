"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_js_1 = __importDefault(require("./connect.js"));
const app_route_1 = __importDefault(require("./routes/app-route"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const chat_routes_1 = __importDefault(require("./routes/chat-routes"));
const app = (0, express_1.default)();
const url = process.env.MONGODB_URI;
app.use(express_1.default.json());
(0, connect_js_1.default)();
app.get("/api", app_route_1.default, (req, res, next) => {
    console.log(); // { name: 'new user', likes: ['coding'] }
    // logic for adding a new user
});
app.get("/users", user_routes_1.default, (req, res, next) => {
    console.log(); // { name: 'new user', likes: ['coding'] }
    // logic for adding a new user
});
app.get("/chats", chat_routes_1.default, (req, res, next) => {
    console.log(); // { name: 'new user', likes: ['coding'] }
    // logic for adding a new user
});
exports.default = app;
