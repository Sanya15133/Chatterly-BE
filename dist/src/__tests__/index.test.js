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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const connect_1 = __importDefault(require("../connect"));
const connect_2 = require("../connect");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.default)();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_2.disconnectMongoose)();
}));
(0, globals_1.describe)("Chatterly B/E", () => {
    it("can connect to users endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).get("/users").expect(200);
    }));
    it("will return 404 if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get("/users/cat").expect(404);
        (0, globals_1.expect)(response.body.msg).toBe("Cannot find specified user");
    }));
    it("can find users by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get("/users/Guest").expect(200);
        (0, globals_1.expect)(response.body.user).toMatchObject({ name: "Guest" });
    }));
});
