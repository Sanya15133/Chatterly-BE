import express from "express";
import { createServer } from "node:http";
import connectMongoose from "./connect.js";
import { Server } from "socket.io";
const apiRouter = require("./apiRouter");

const app = express();
const server = createServer(app);
const io = new Server(server);

const url: string | undefined = process.env.MONGODB_URI;

app.use(express.json());

connectMongoose();

app.get("/api/users", apiRouter, (req: any, res: any, next: any) => {
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
