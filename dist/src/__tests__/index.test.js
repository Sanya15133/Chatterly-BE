"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../connect"));
const connect_2 = require("../connect");
beforeEach(() => {
    (0, connect_1.default)();
});
afterEach(() => {
    (0, connect_2.disconnectMongoose)();
});
