import express from "express";
import connectMongoose from "./connect.js";
import apiRouter from "./routes/app-route";
import userRouter from "./routes/user-routes";

const app = express();

const url: string | undefined = process.env.MONGODB_URI;

app.use(express.json());

connectMongoose();

app.get("/api", apiRouter, (req: any, res: any, next: any) => {
  console.log(); // { name: 'new user', likes: ['coding'] }
  // logic for adding a new user
});

app.get("/users", userRouter, (req: any, res: any, next: any) => {
  console.log(); // { name: 'new user', likes: ['coding'] }
  // logic for adding a new user
});

export default app;
