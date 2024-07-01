import { describe } from "node:test";

const Model = require("./index");
const expect = require("chai").expect;
const connectMongoose = require("./connect");

beforeEach(async () => {
  await connectMongoose();
});

afterEach(async () => {
  await disconnectMongoose();
});

describe("Testing Endpoints", () => {
  it("GET returns users in db", () => {});
});
