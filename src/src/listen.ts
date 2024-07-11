import app from "./index";
import * as WebSocket from "ws";

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`APP is running on ${PORT}`);
});

const wss = new WebSocket.Server({ server: server });

wss.on("connection", (ws: any) => {
  console.log("Client connected");

  ws.on("message", (message: any) => {
    console.log("Received: %s", message);
    ws.send(`${message}`);
  });

  ws.on("close", function () {
    console.log("Client disconnected");
  });
});
