"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.findUserToDelete = exports.checkLoginUser = exports.addUser = exports.findUser = exports.findUsers = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const connect_1 = __importStar(require("../connect"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isModified("password")) {
                this.password = yield bcrypt.hash(this.password, 10);
            }
            next();
        }
        catch (error) {
            next();
        }
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
const guest = new User({
    name: "Guest",
    password: "123456",
    avatar: "https://www.screenfeed.fr/wp-content/uploads/2013/10/default-avatar.png",
});
function findUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connect_1.default)();
        return yield User.find().then((users) => {
            return users;
        });
    });
}
exports.findUsers = findUsers;
function findUser(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connect_1.default)();
        return yield User.find({ name: name }).then((user) => {
            (0, connect_1.disconnectMongoose)();
            if (user.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: "Cannot find specified user",
                });
            }
            return user;
        });
    });
}
exports.findUser = findUser;
function addUser(name, password, avatar) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connect_1.default)();
        if (!name) {
            return Promise.reject({
                status: 400,
                msg: "Missing name parameter",
            });
        }
        if (!password) {
            return Promise.reject({
                status: 400,
                msg: "Password is required",
            });
        }
        if (name.length < 3) {
            return Promise.reject({
                status: 400,
                msg: "Name should be longer than 3 characters",
            });
        }
        if (password.length < 5 || typeof password !== "string") {
            return Promise.reject({
                status: 400,
                msg: "Password should be longer than 5 characters",
            });
        }
        let checkName;
        return yield User.find({ name: name }).then((user) => {
            checkName = user;
            if (checkName.length !== 0) {
                return Promise.reject({ status: 400, msg: "User already exists" });
            }
            if (!avatar) {
                avatar =
                    "https://community.intellistrata.com.au/CommunityMobile/img/user.png";
            }
            return User.create({ name, password, avatar }).then((user) => {
                return user;
            });
        });
    });
}
exports.addUser = addUser;
function checkLoginUser(name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connect_1.default)();
        if (!name) {
            return Promise.reject({
                status: 400,
                msg: "Missing name parameter",
            });
        }
        if (!password) {
            return Promise.reject({
                status: 400,
                msg: "Password is required",
            });
        }
        const user = yield User.findOne({ name: name });
        if (!user) {
            return Promise.reject({ status: 404, msg: "User does not exist" });
        }
        const isPasswordMatch = yield bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return Promise.reject({ status: 401, msg: "Invalid password" });
        }
        return user;
    });
}
exports.checkLoginUser = checkLoginUser;
function findUserToDelete(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connect_1.default)();
        const result = yield User.deleteOne({ name: name });
        if (result.deletedCount === 0) {
            return Promise.reject({ status: 404, msg: "User does not exist" });
        }
    });
}
exports.findUserToDelete = findUserToDelete;
exports.default = User;
