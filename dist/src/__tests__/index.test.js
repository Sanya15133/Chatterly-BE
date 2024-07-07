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
(0, globals_1.describe)("GET /users", () => {
    it("users can connect to users endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).get("/users").expect(200);
    }));
    it("will return 404 if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get("/users/cat").expect(404);
        (0, globals_1.expect)(response.body.msg).toBe("Cannot find specified user");
    }));
    it("can find users by name if they exist on db", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get("/users/Guest").expect(200);
        (0, globals_1.expect)(response.body.user).toMatchObject({ name: "Guest" });
    }));
    it("checks db is not empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get("/users").expect(200);
        (0, globals_1.expect)(response.body.users.length).toBeGreaterThan(0);
    }));
    it("POST /users will not post user if already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: "Sanya",
            password: "123456",
            avatar: "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send(newUser)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("User already exists");
    }));
    it("POST /users will post new user if user doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser2 = {
            name: "Dahlia",
            password: "123456",
            avatar: "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send(newUser2)
            .expect(201);
        (0, globals_1.expect)(response.body.user).toMatchObject({ name: "Dahlia" });
    }));
    it("POST /users will not post new user if missing name", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser2 = {
            password: "123456",
            avatar: "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send(newUser2)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Missing name parameter");
    }));
    it("POST /users will not post new user if missing password", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser2 = {
            name: "123456",
            avatar: "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send(newUser2)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Password is required");
    }));
    it("POST /users will use default avatar if not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser2 = {
            name: "Marigold",
            password: "123456",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send(newUser2)
            .expect(201);
        (0, globals_1.expect)(response.body.user).toMatchObject({
            name: "Marigold",
            avatar: "https://community.intellistrata.com.au/CommunityMobile/img/user.png",
        });
    }));
    it("POST /users will throw error if password is too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser2 = {
            name: "Peaches",
            password: "123",
            avatar: "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send(newUser2)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Password should be longer than 5 characters");
    }));
    it.only("POST /users will throw error if name is too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser2 = {
            name: "Oh",
            password: "123444",
            avatar: "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send(newUser2)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Name should be longer than 3 characters");
    }));
});
