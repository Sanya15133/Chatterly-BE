"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const Model = require("./index");
const expect = require("chai").expect;
const connect_js_1 = require("./connect.js");
const connect_js_2 = __importDefault(require("./connect.js"));
beforeEach(() => {
    (0, connect_js_2.default)();
});
afterEach(() => {
    (0, connect_js_1.disconnectMongoose)();
});
(0, node_test_1.describe)("Testing Endpoints", () => {
    it("GET returns users in db", () => { });
});
