import { disconnectMongoose } from "./connect.js";
import connectMongoose from "./connect.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
const app = require("./index.js"); 
chai.use(chaiHttp);

beforeEach(() => {
  connectMongoose();
});

afterEach(() => {
  disconnectMongoose();
});

describe("Testing Endpoints", () => {
  it("GET /users", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err: any, res: any) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});
