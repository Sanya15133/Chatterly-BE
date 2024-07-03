import express from "express";
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`APP is running on ${PORT}`);
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
});
