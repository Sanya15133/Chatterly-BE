import express from "express";
import apiRouter from "./routes/app-route";
import userRouter from "./routes/user-routes";
import chatRouter from "./routes/chat-routes";
import * as WebSocket from "ws";
import cors from "cors";

//had to combine index and listen file for render to host mongodb
const {
  handleCustomErrors,
  handle400Errors,
  handle404Errors,
  handle500Errors,
} = require("./errors");

const PORT = process.env.PORT || 10000;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`APP is running on ${PORT}`);
});

const wss = new WebSocket.Server({ server: server });

wss.on("connection", (ws: any) => {
  console.log("Client connected");

  ws.on("message", (message: any) => {
    console.log("Received: %s", message);

    wss.clients.forEach((client: any) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error: Error) => {
    console.error("WebSocket error:", error);
  });
});

app.use(express.json());
app.use(cors());

app.use("/", apiRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);

app.use(handleCustomErrors);
app.use(handle400Errors);
app.use(handle404Errors);
app.use(handle500Errors);

export default app;
