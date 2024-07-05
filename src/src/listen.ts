import express from "express";
const app = express();
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`APP is running on ${PORT}`);
});

wss.on("connection", () => (ws: any) => {
  console.log("Client connected");

  ws.on("message", () => (message: any) => {
    console.log("Received: %s", message);

    ws.send(`${message}`);
  });

  ws.on("close", function () {
    console.log("Client disconnected");
  });
});
