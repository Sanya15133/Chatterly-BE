import express from "express";
import apiRouter from "./routes/app-route";
import userRouter from "./routes/user-routes";
import chatRouter from "./routes/chat-routes";

const app = express();
app.use(express.json());

app.use("/", apiRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);

export default app;
