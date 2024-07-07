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
  it("POST /users will post new user if user doesn't exist", async () => {
    const newUser2 = {
      name: "Dahlia",
      password: "123456",
      avatar:
        "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
    };
    const response = await request(app)
      .post("/users")
      .send(newUser2)
      .expect(201);
    expect(response.body.user).toMatchObject({ name: "Dahlia" });
  });
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
  it("POST /users will not post new user if missing password", async () => {
    const newUser2 = {
      name: "123456",
      avatar:
        "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
    };
    const response = await request(app)
      .post("/users")
      .send(newUser2)
      .expect(400);
    expect(response.body.msg).toBe("Password is required");
  });
  it("POST /users will use default avatar if not provided", async () => {
    const newUser2 = {
      name: "Marigold",
      password: "123456",
    };
    const response = await request(app)
      .post("/users")
      .send(newUser2)
      .expect(201);
    expect(response.body.user).toMatchObject({
      name: "Marigold",
      avatar:
        "https://community.intellistrata.com.au/CommunityMobile/img/user.png",
    });
  });
  it("POST /users will throw error if password is too short", async () => {
    const newUser2 = {
      name: "Peaches",
      password: "123",
      avatar:
        "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
    };
    const response = await request(app)
      .post("/users")
      .send(newUser2)
      .expect(400);
    expect(response.body.msg).toBe(
      "Password should be longer than 5 characters"
    );
  });
  it("POST /users will throw error if name is too short", async () => {
    const newUser2 = {
      name: "Oh",
      password: "123444",
      avatar:
        "http://vignette1.wikia.nocookie.net/mrmen/images/7/7a/Little_Miss_Bad.png/revision/latest?cb=20160325190558",
    };
    const response = await request(app)
      .post("/users")
      .send(newUser2)
      .expect(400);
    expect(response.body.msg).toBe("Name should be longer than 3 characters");
  });
  it("GET /chats can connect to chats endpoint", async () => {
    await request(app).get("/chats").expect(200);
  });
  it("GET /chats will return 404 if chat by non-existent user does not exist", async () => {
    const response = await request(app).get("/chats/cat").expect(404);
    expect(response.body.msg).toBe("Cannot find messages for this user");
  });
  it("GET /chats can find chats by users name if they exist on db", async () => {
    const response = await request(app).get("/chats/Guest").expect(200);
    console.log(response.body.chats);
    response.body.chats.forEach((chat: any) => {
      expect(chat.name).toBe("Guest");
      expect(typeof chat.message).toBe("string");
      expect(typeof chat.date).toBe("string");
    });
  });
  it("GET /chats checks db is not empty", async () => {
    const response = await request(app).get("/chats").expect(200);
    expect(response.body.chats.length).toBeGreaterThan(0);
  });
  it("POST /chats will post chats will all required parameters", async () => {
    const newChat = {
      name: "Sanya",
      message: "Hello World",
    };
    const response = await request(app)
      .post("/chats")
      .send(newChat)
      .expect(201);
    expect(response.body.chat).toMatchObject({
      name: "Sanya",
      message: "Hello World",
    });
  });
  it("POST /chats will not post new chat if missing name", async () => {
    const newChat = {
      message: "123456",
    };
    const response = await request(app)
      .post("/chats")
      .send(newChat)
      .expect(400);
    expect(response.body.msg).toBe("Missing name parameter");
  });
  it("POST /chats will not post new chat if missing message", async () => {
    const newChat = {
      name: "123456",
    };
    const response = await request(app)
      .post("/chats")
      .send(newChat)
      .expect(400);
    expect(response.body.msg).toBe("Missing message parameter");
  });
  it.only("POST /chats will throw error if message is too short", async () => {
    const newChat = {
      name: "Peaches",
      message: "123",
    };
    const response = await request(app)
      .post("/chats")
      .send(newChat)
      .expect(400);
    expect(response.body.msg).toBe("Message needs to be longer");
  });
});
