const userRouter = require("express").Router();
const User = require("../model/user-model");
import { getUsers } from "../controllers/user-controller";

userRouter.route("/");

userRouter.get("/users", getUsers);
module.exports = userRouter;
