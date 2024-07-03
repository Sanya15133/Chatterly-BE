"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter = require("express").Router();
const User = require("../model/user-model");
const user_controller_1 = require("../controllers/user-controller");
userRouter.get("/users", user_controller_1.getUsers);
userRouter.get("/users/:name", user_controller_1.getUserByName);
userRouter.post("/users", user_controller_1.insertUser);
exports.default = userRouter;
