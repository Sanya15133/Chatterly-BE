import express from "express";
import connectMongoose from "./connect.js";
import apiRouter from "./routes/app-route";
import userRouter from "./routes/user-routes";
import chatRouter from "./routes/chat-routes";

const app = express();

const url: string | undefined = process.env.MONGODB_URI;

app.use(express.json());

connectMongoose();

app.get("/api", apiRouter);

app.get("/users", userRouter);

app.get("/chats", chatRouter);

export default app;
