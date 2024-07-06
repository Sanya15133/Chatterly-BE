"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.getUserByName = exports.getUsers = void 0;
const user_model_1 = require("../model/user-model");
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
