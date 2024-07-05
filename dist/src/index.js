"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_route_1 = __importDefault(require("./routes/app-route"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const chat_routes_1 = __importDefault(require("./routes/chat-routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", app_route_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/chats", chat_routes_1.default);
exports.default = app;
