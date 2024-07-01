"use strict";
const userRouter = require("express").Router();
const User = require("../model/user-model");
userRouter.route("/:name");
userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.send(users);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
module.exports = userRouter;
