"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const connect_1 = __importDefault(require("../connect"));
const connect_2 = require("../connect");
beforeEach(() => {
    (0, connect_1.default)();
});
afterEach(() => {
    (0, connect_2.disconnectMongoose)();
});
(0, globals_1.describe)("Chatterly B/E", () => {
    it("can connect to users endpoint", () => {
        return (0, supertest_1.default)(index_1.default).get("/users").expect(200);
    });
    it("can find users by name", () => {
        return (0, supertest_1.default)(index_1.default).get("/users/cat").expect(404);
    });
});
