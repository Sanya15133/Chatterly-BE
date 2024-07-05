import express from "express";
import apiRouter from "./routes/app-route";
import userRouter from "./routes/user-routes";
import chatRouter from "./routes/chat-routes";

const app = express();
app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

export default app;
