"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.insertUser = exports.getUserByName = exports.getUsers = void 0;
const user_model_1 = require("../model/user-model");
const jwt = require("jsonwebtoken");
function getUsers(req, res, next) {
    return (0, user_model_1.findUsers)()
        .then((users) => {
        res.status(200).send({ users });
    })
        .catch((error) => {
        next(error);
    });
}
exports.getUsers = getUsers;
function getUserByName(req, res, next) {
    const { name } = req.params;
    return (0, user_model_1.findUser)(name)
        .then((users) => {
        const user = users[0];
        res.status(200).send({ user });
    })
        .catch((error) => {
        next(error);
    });
}
exports.getUserByName = getUserByName;
function insertUser(req, res, next) {
    const { name, password, avatar } = req.body;
    return (0, user_model_1.addUser)(name, password, avatar)
        .then((user) => {
        res.status(201).send({ user });
    })
        .catch((error) => {
        next(error);
    });
}
exports.insertUser = insertUser;
function loginUser(req, res, next) {
    const { name, password } = req.body;
    return (0, user_model_1.checkLoginUser)(name, password)
        .then((user) => {
        console.log({ user });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).send({ token });
    })
        .catch((error) => {
        next(error);
    });
}
exports.loginUser = loginUser;
