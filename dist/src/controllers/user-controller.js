"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.insertUser = exports.getUserByName = exports.getUsers = void 0;
const user_model_1 = require("../model/user-model");
const jwt = require("jsonwebtoken");
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, user_model_1.findUsers)()
            .then((users) => {
            res.status(200).send({ users });
        })
            .catch((error) => {
            console.log(error, 'in get all users');
            next(error);
        });
    });
}
exports.getUsers = getUsers;
function getUserByName(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.params;
        return yield (0, user_model_1.findUser)(name)
            .then((users) => {
            const user = users[0];
            res.status(200).send({ user });
        })
            .catch((error) => {
            console.log(error, 'in get user by name');
            next(error);
        });
    });
}
exports.getUserByName = getUserByName;
function insertUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password, avatar } = req.body;
        return yield (0, user_model_1.addUser)(name, password, avatar)
            .then((user) => {
            res.status(201).send({ user });
        })
            .catch((error) => {
            console.log(error, 'in insert user');
            next(error);
        });
    });
}
exports.insertUser = insertUser;
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password } = req.body;
        return yield (0, user_model_1.checkLoginUser)(name, password)
            .then((user) => {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1h",
            });
            res.status(200).send({ token });
        })
            .catch((error) => {
            console.log(error, 'in login');
            next(error);
        });
    });
}
exports.loginUser = loginUser;
