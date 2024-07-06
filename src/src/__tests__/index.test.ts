import { describe, expect } from "@jest/globals";
import app from "../index";
import request from "supertest";
import connectMongoose from "../connect";
import { disconnectMongoose } from "../connect";

beforeEach(() => {
  connectMongoose();
});

afterEach(() => {
  disconnectMongoose();
});

describe("Chatterly B/E", () => {
  it("can connect to users endpoint", () => {
    return request(app).get("/users").expect(200);
  });
  it("can find users by name", () => {
    return request(app).get("/users/cat").expect(404);
  });
});
