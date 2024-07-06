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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.findUser = exports.findUsers = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const connect_1 = __importDefault(require("../connect"));
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
// const guest = new User({
//   name: "Guest",
//   password: "123456",
//   avatar:
//     "https://www.screenfeed.fr/wp-content/uploads/2013/10/default-avatar.png",
// });
function findUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, connect_1.default)();
        return yield User.find().then((users) => {
            return users;
        });
    });
}
exports.findUsers = findUsers;
function findUser(name) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, connect_1.default)();
        return yield User.find({ name: name }).then((user) => {
            if (user.length === 0) {
                return Promise.reject({ status: 404, msg: "Cannot find specified user" });
            }
            return user;
        });
    });
}
exports.findUser = findUser;
function addUser(name, password, avatar) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, connect_1.default)();
        const checkName = yield findUser(name);
        if (checkName) {
            return Promise.reject({ status: 400, msg: "User already exists" });
        }
        if (name.length < 5) {
            return Promise.reject({
                status: 400,
                msg: "Name should be longer than 5 characters",
            });
        }
        if (password.length < 5) {
            return Promise.reject({
                status: 400,
                msg: "Password should be longer than 5 characters",
            });
        }
        if (!avatar) {
            avatar =
                "https://community.intellistrata.com.au/CommunityMobile/img/user.png";
        }
        return User.create({ name, password, avatar }).then((user) => {
            return user;
        });
    });
}
exports.addUser = addUser;
exports.default = User;
