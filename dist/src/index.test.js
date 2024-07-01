"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model = require("./index");
const connect_js_1 = require("./connect.js");
const connect_js_2 = __importDefault(require("./connect.js"));
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // replace with path to your server file
chai.use(chaiHttp);
const expect = chai.expect;
beforeEach(() => {
    (0, connect_js_2.default)();
});
afterEach(() => {
    (0, connect_js_1.disconnectMongoose)();
});
describe("Testing Endpoints", () => {
    it("GET /users", (done) => {
        chai
            .request(app)
            .get("/users")
            .end((err, res) => {
            expect(res).to.have.status(100);
            // other assertions
            done();
        });
    });
});
