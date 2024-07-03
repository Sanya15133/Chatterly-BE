"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByName = exports.getUsers = void 0;
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
        .then((user) => {
        res.status(200).send({ user });
    })
        .catch((error) => {
        next(error);
    });
}
exports.getUserByName = getUserByName;
