"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_js_1 = require("./connect.js");
const connect_js_2 = __importDefault(require("./connect.js"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app = require("./index.js");
const expect = chai_1.default.expect;
chai_1.default.use(chai_http_1.default);
beforeEach(() => {
    (0, connect_js_2.default)();
});
afterEach(() => {
    (0, connect_js_1.disconnectMongoose)();
});
describe("Testing Endpoints", () => {
    it("GET /users", (done) => {
        chai_1.default
            .request(app)
            .get("/users")
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res).to.have.status(200);
            done();
        });
    });
});
