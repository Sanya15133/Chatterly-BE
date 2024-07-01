import { describe } from "node:test";
const Model = require("./index");
const expect = require("chai").expect;
import { disconnectMongoose } from "./connect.js";
import connectMongoose from "./connect.js";

beforeEach(() => {
  connectMongoose();
});

afterEach(() => {
  disconnectMongoose();
});

describe("Testing Endpoints", () => {
  it("GET returns users in db", () => {});
});
