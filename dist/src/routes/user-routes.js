"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter = require("express").Router();
const User = require("../model/user-model");
const user_controller_1 = require("../controllers/user-controller");
userRouter.get("/users", user_controller_1.getUsers);
module.exports = userRouter;
