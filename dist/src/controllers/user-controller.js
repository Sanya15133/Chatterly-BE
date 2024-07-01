"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
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
