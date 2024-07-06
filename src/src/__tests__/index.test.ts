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
  it("can connect to users endpoint", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
  });
  it("can find users by name", async () => {
    const response = await request(app).get("/users/cat");
    expect(response.status).toBe(200);
  });
});
