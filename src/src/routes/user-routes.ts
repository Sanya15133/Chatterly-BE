const userRouter = require("express").Router();
const User = require("../model/user-model");
import { getUsers, getUserByName } from "../controllers/user-controller";

userRouter.get("/users", getUsers);
userRouter.get("/users/:name", getUserByName);

export default userRouter;
