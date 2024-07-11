import app from "./index";
import * as WebSocket from "ws";
import connectMongoose from "./connect";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectMongoose();
  const server = app.listen(PORT, () => {
    console.log(`APP is running on ${PORT}`);
  });
  startServer().catch((err) => {
    console.error("Error starting server:", err.message);
    process.exit(1);
  });
};

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
