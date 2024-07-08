"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_route_1 = __importDefault(require("./routes/app-route"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const chat_routes_1 = __importDefault(require("./routes/chat-routes"));
const cors_1 = __importDefault(require("cors"));
const { handleCustomErrors, handle400Errors, handle404Errors, handle500Errors, } = require("./errors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", app_route_1.default);
app.use("/users", user_routes_1.default);
app.use("/users/login", user_routes_1.default);
app.use("/chats", chat_routes_1.default);
app.use(handleCustomErrors);
app.use(handle400Errors);
app.use(handle404Errors);
app.use(handle500Errors);
exports.default = app;
