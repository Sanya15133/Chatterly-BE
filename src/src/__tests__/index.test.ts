import { describe, expect, test } from "@jest/globals";
import app from "../index";
import request from "supertest";
import connectMongoose from "../connect";
import { disconnectMongoose } from "../connect";

beforeEach(async () => {
  await connectMongoose();
});

afterEach(async () => {
  await disconnectMongoose();
});

describe("Chatterly B/E", () => {
  test("can connect to users endpoint", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
  });
});
