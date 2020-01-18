import { describe } from "mocha";
import chai from "chai";
import chaiHttp = require("chai-http");

import app from "../src/App";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Offers API", () => {
  it("list available offers successfully", () => {
    return chai
      .request(app)
      .get("/offers")
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.length(57);

        let item = res.body[0];
        expect(item.id).to.be.an("string");
        expect(item.visible).to.be.an("boolean");
        expect(item.car).to.be.an("object");
        expect(item.images).to.be.an("array");
      });
  });
});
