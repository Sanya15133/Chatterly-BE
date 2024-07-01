import { disconnectMongoose } from "./connect.js";
import connectMongoose from "./connect.js";
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/index.js"); // replace with path to your server file
chai.use(chaiHttp);
const expect = chai.expect;

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
        expect(res).to.have.status(100);
        // other assertions
        done();
      });
  });
});
