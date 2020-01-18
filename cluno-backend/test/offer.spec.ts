import { describe } from "mocha";
import chai from "chai";
import chaiHttp = require("chai-http");

import app from "../src/App";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Offer details API", () => {
  it("gets detail of an offer successfully", async () => {
    return chai
      .request(app)
      .get("/offers/195")
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.be.an("string");
        expect(res.body.id).to.be.equal("195");
        expect(res.body.visible).to.be.an("boolean");
        expect(res.body.car).to.be.an("object");
        expect(res.body.images).to.be.an("array");
      });
  });

  it("returns 404 if offer id is not found", async () => {
    return chai
      .request(app)
      .get("/offers/1000")
      .then(res => {
        expect(res.status).to.equal(404);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.be.an("string");
        expect(res.body.message).to.be.equal("Offer not found");
      });
  });
});
