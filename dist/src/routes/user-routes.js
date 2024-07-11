"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user-controller");
const userRouter = require("express").Router();
userRouter.get("/", user_controller_1.getUsers);
userRouter.get("/:name", user_controller_1.getUserByName);
userRouter.post("/", user_controller_1.insertUser);
userRouter.post("/login/:name", user_controller_1.loginUser);
exports.default = userRouter;
