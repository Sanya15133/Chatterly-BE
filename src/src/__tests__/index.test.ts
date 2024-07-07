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
    const response = await request(app).get("/users/Sanya").expect(200);
    expect(response.body.user).toMatchObject({ name: "Sanya" });
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
  it.skip("POST /users will post new user if user doesn't exist", async () => {
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
  it.skip("POST /users will use default avatar if not provided", async () => {
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
    const response = await request(app).get("/chats/Sanya").expect(200);
    response.body.chats.forEach((chat: any) => {
      expect(chat.name).toBe("Sanya");
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
  it("POST /chats will throw error if message is too short", async () => {
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
  it("POST /users/login will throw error if not given name", async () => {
    const logIn = {
      password: "123",
    };
    const response = await request(app)
      .post("/users/login")
      .send(logIn)
      .expect(400);
    expect(response.body.msg).toBe("Missing name parameter");
  });
  it("POST /users/login will throw error if not given password", async () => {
    const logIn = {
      name: "123",
    };
    const response = await request(app)
      .post("/users/login")
      .send(logIn)
      .expect(400);
    expect(response.body.msg).toBe("Password is required");
  });
  it("POST /users/login will throw error if not given valid user", async () => {
    const logIn = {
      name: "Ned Stark",
      password: "Winterfell",
    };
    const response = await request(app)
      .post("/users/login")
      .send(logIn)
      .expect(404);
    expect(response.body.msg).toBe("User does not exist");
  });
  it("POST /users/login will login if given valid user", async () => {
    const logIn = {
      name: "Sanya",
      password: "123456",
    };
    const response = await request(app)
      .post("/users/login")
      .send(logIn)
      .expect(200);
  });
  it("POST /users/login will throw error if given valid user but invalid password", async () => {
    const logIn = {
      name: "Sanya",
      password: "67890",
    };
    const response = await request(app)
      .post("/users/login")
      .send(logIn)
      .expect(401);
    expect(response.body.msg).toBe("Invalid password");
  });
});
