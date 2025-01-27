import {
  getUsers,
  getUserByName,
  insertUser,
  loginUser,
  deleteUser,
} from "../controllers/user-controller";

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:name", getUserByName);
userRouter.post("/", insertUser);
userRouter.post("/login", loginUser);
userRouter.delete("/:name", deleteUser);

export default userRouter;
