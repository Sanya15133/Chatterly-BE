import { describe, expect } from "@jest/globals";
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
  it("can connect to users endpoint", async () => {
    await request(app).get("/users").expect(200);
  });
  it("will return 404 if user does not exist", async () => {
    const response = await request(app).get("/users/cat").expect(404);
    expect(response.body.msg).toBe("Cannot find specified user");
  });
  it("can find users by name", async () => {
    const response = await request(app).get("/users/Guest").expect(200);
    expect(response.body.user).toMatchObject({ name: "Guest" });
  });
});
