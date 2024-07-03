const userRouter = require("express").Router();
const User = require("../model/user-model");
import {
  getUsers,
  getUserByName,
  insertUser,
} from "../controllers/user-controller";

userRouter.get("/users", getUsers);
userRouter.get("/users/:name", getUserByName);
userRouter.post("/users", insertUser);

export default userRouter;
