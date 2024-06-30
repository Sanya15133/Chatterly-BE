import express from "express";
import { createServer } from "node:http";
import connectMongoose from "./connect";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

connectMongoose();

app.get("/api/users", (req: any, res: any, next: any) => {
  console.log(); // { name: 'new user', likes: ['coding'] }
  // logic for adding a new user
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
