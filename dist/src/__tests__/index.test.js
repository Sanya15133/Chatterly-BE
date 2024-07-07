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
        const response = yield (0, supertest_1.default)(index_1.default).get("/users/Sanya").expect(200);
        (0, globals_1.expect)(response.body.user).toMatchObject({ name: "Sanya" });
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
    it.skip("POST /users will post new user if user doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
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
    it.skip("POST /users will use default avatar if not provided", () => __awaiter(void 0, void 0, void 0, function* () {
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
    it("POST /users will throw error if name is too short", () => __awaiter(void 0, void 0, void 0, function* () {
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
    it("GET /chats can connect to chats endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).get("/chats").expect(200);
    }));
    it("GET /chats will return 404 if chat by non-existent user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get("/chats/cat").expect(404);
        (0, globals_1.expect)(response.body.msg).toBe("Cannot find messages for this user");
    }));
    it("GET /chats can find chats by users name if they exist on db", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get("/chats/Sanya").expect(200);
        response.body.chats.forEach((chat) => {
            (0, globals_1.expect)(chat.name).toBe("Sanya");
            (0, globals_1.expect)(typeof chat.message).toBe("string");
            (0, globals_1.expect)(typeof chat.date).toBe("string");
        });
    }));
    it("GET /chats checks db is not empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get("/chats").expect(200);
        (0, globals_1.expect)(response.body.chats.length).toBeGreaterThan(0);
    }));
    it("POST /chats will post chats will all required parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            name: "Sanya",
            message: "Hello World",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/chats")
            .send(newChat)
            .expect(201);
        (0, globals_1.expect)(response.body.chat).toMatchObject({
            name: "Sanya",
            message: "Hello World",
        });
    }));
    it("POST /chats will not post new chat if missing name", () => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            message: "123456",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/chats")
            .send(newChat)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Missing name parameter");
    }));
    it("POST /chats will not post new chat if missing message", () => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            name: "123456",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/chats")
            .send(newChat)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Missing message parameter");
    }));
    it("POST /chats will throw error if message is too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            name: "Peaches",
            message: "123",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/chats")
            .send(newChat)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Message needs to be longer");
    }));
    it("POST /users/login will throw error if not given name", () => __awaiter(void 0, void 0, void 0, function* () {
        const logIn = {
            password: "123",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users/login")
            .send(logIn)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Missing name parameter");
    }));
    it("POST /users/login will throw error if not given password", () => __awaiter(void 0, void 0, void 0, function* () {
        const logIn = {
            name: "123",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users/login")
            .send(logIn)
            .expect(400);
        (0, globals_1.expect)(response.body.msg).toBe("Password is required");
    }));
    it("POST /users/login will throw error if not given valid user", () => __awaiter(void 0, void 0, void 0, function* () {
        const logIn = {
            name: "Ned Stark",
            password: "Winterfell",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users/login")
            .send(logIn)
            .expect(404);
        (0, globals_1.expect)(response.body.msg).toBe("User does not exist");
    }));
    it("POST /users/login will login if given valid user", () => __awaiter(void 0, void 0, void 0, function* () {
        const logIn = {
            name: "Sanya",
            password: "123456",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users/login")
            .send(logIn)
            .expect(200);
    }));
    it("POST /users/login will throw error if given valid user but invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        const logIn = {
            name: "Sanya",
            password: "67890",
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/users/login")
            .send(logIn)
            .expect(401);
        (0, globals_1.expect)(response.body.msg).toBe("Invalid password");
    }));
});
