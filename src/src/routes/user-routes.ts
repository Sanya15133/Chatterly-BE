const userRouter = require("express").Router();
const User = require("../model/user-model");
import { getUsers } from "../controllers/user-controller";

userRouter.get("/users", getUsers);
export default userRouter;
