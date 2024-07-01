"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const Model = require("./index");
const expect = require("chai").expect;
const connectMongoose = require("./connect");
beforeEach(async () => {
    await connectMongoose();
});
afterEach(async () => {
    await disconnectMongoose();
});
(0, node_test_1.describe)("Testing Endpoints", () => {
    it("GET returns users in db", () => { });
});
