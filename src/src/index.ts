import express from "express";
import apiRouter from "./routes/app-route";
import userRouter from "./routes/user-routes";
import chatRouter from "./routes/chat-routes";
const {
  handleCustomErrors,
  handle400Errors,
  handle404Errors,
  handle500Errors,
} = require("./errors");

const app = express();
app.use(express.json());

app.use("/", apiRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);

app.use(handleCustomErrors);
app.use(handle400Errors);
app.use(handle404Errors);
app.use(handle500Errors);

export default app;
