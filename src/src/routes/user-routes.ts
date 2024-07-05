import {
  getUsers,
  getUserByName,
  insertUser,
} from "../controllers/user-controller";

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:name", getUserByName);
userRouter.post("/", insertUser);

export default userRouter;
