import { disconnectMongoose } from "./connect.js";
import connectMongoose from "./connect.js";
import chai from "chai";
import chaiHttp from "chai-http";
const app = require("./index.js");

const expect = chai.expect;

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
        if (err) return done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});
