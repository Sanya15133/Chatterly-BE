"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
try {
    app
        .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
        .on("error", (err) => {
        console.error("Error in server setup:", err);
    });
}
catch (err) {
    console.error("Error in server setup:", err);
}
const server = app.listen(PORT, () => {
    console.log(`IO Server is running on port ${PORT}`);
});
const io = require("socket.io")(server);
