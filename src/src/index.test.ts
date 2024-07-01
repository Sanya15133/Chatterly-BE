import { describe } from "node:test";
const Model = require("./index");
const expect = require("chai").expect;
import { disconnectMongoose } from "./connect.js";
import connectMongoose from "./connect.js";
import { request } from "node:http";

beforeEach(() => {
  connectMongoose();
});

afterEach(() => {
  disconnectMongoose();
});

describe("Testing Endpoints", () => {
  it("GET / users", (done) => {
    request(Model)
      .get("/users")
      .end((err: any, res: any) => {
        expect(res).to.have.status(200);
        // other assertions
        done();
      });
  });
});
