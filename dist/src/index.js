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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_route_1 = __importDefault(require("./routes/app-route"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const chat_routes_1 = __importDefault(require("./routes/chat-routes"));
const WebSocket = __importStar(require("ws"));
const cors_1 = __importDefault(require("cors"));
//had to combine index and listen file for render to host mongodb
const { handleCustomErrors, handle400Errors, handle404Errors, handle500Errors, } = require("./errors");
const PORT = process.env.PORT || 10000;
const app = (0, express_1.default)();
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
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", app_route_1.default);
app.use("/users", user_routes_1.default);
app.use("/chats", chat_routes_1.default);
app.use(handleCustomErrors);
app.use(handle400Errors);
app.use(handle404Errors);
app.use(handle500Errors);
exports.default = app;
