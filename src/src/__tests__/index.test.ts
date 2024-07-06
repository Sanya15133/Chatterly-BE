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

describe("GET /users", () => {
  it("users can connect to users endpoint", async () => {
    await request(app).get("/users").expect(200);
  });
  it("will return 404 if user does not exist", async () => {
    const response = await request(app).get("/users/cat").expect(404);
    expect(response.body.msg).toBe("Cannot find specified user");
  });
  it("can find users by name if they exist on db", async () => {
    const response = await request(app).get("/users/Guest").expect(200);
    expect(response.body.user).toMatchObject({ name: "Guest" });
  });
  it("checks db is not empty", async () => {
    const response = await request(app).get("/users").expect(200);
    expect(response.body.users.length).toBeGreaterThan(0);
  });
  it("POST /users will not post user if already exists", async () => {
    const newUser = {
      name: "Sanya",
      password: "123456",
      avatar:
        "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
    };
    const response = await request(app)
      .post("/users")
      .send(newUser)
      .expect(400);
    expect(response.body.msg).toBe("User already exists");
  });
  // it("POST /users will post new user if doesn't exist", async () => {
  //   const newUser2 = {
  //     name: "Anon",
  //     password: "123456",
  //     avatar:
  //       "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
  //   };
  //   const response = await request(app)
  //     .post("/users")
  //     .send(newUser2)
  //     .expect(201);
  //   expect(response.body.user).toMatchObject({ name: "Anon" });
  // });
  it("POST /users will not post new user if missing name", async () => {
    const newUser2 = {
      password: "123456",
      avatar:
        "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
    };
    const response = await request(app)
      .post("/users")
      .send(newUser2)
      .expect(400);
    expect(response.body.msg).toBe("Missing name parameter");
  });
});
