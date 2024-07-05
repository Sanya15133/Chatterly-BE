import express from "express";
import connectMongoose from "./connect.js";
import apiRouter from "./routes/app-route";

const app = express();

const url: string | undefined = process.env.MONGODB_URI;

app.use(express.json());

connectMongoose();

app.use("/api", apiRouter);

export default app;
