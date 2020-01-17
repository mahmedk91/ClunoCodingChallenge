"use strict";

import * as handlers from "./handlers";
import chai from "chai";
import { Context } from "aws-lambda";
const expect = chai.expect;
var event: any, context: Context;

describe("Offers API", function() {
  it("list offers successfully", async () => {
    const response = await handlers.listOffers(event, context);

    expect(response).to.be.an("object");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("string");

    let body = JSON.parse(response.body);

    expect(body).to.be.an("array");
    expect(body).does.not.have.length(0);

    let item = body[0];
    expect(item.id).to.be.an("string");
    expect(item.visible).to.be.an("boolean");
    expect(item.car).to.be.an("object");
    expect(item.images).to.be.an("array");
  });
});

describe("Offer details API", function() {
  it("gets detail of an offer successfully", async () => {
    event = {};
    event.pathParameters = { id: "195" };
    const response = await handlers.offerDetails(event, context);

    expect(response).to.be.an("object");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("string");

    let body = JSON.parse(response.body);

    expect(body).to.be.an("object");
    expect(body.id).to.be.an("string");
    expect(body.id).to.be.equal("195");
    expect(body.visible).to.be.an("boolean");
    expect(body.car).to.be.an("object");
    expect(body.images).to.be.an("array");
  });

  it("returns 400 if offer id is missing in the request", async () => {
    event = {};
    const response = await handlers.offerDetails(event, context);

    expect(response).to.be.an("object");
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.be.an("string");

    let body = JSON.parse(response.body);

    expect(body).to.be.an("object");
    expect(body.message).to.be.equal("No offer id provided in the path");
  });

  it("returns 404 if offer id is not found", async () => {
    event = {};
    event.pathParameters = { id: "1000" };
    const response = await handlers.offerDetails(event, context);

    expect(response).to.be.an("object");
    expect(response.statusCode).to.equal(404);
    expect(response.body).to.be.an("string");

    let body = JSON.parse(response.body);

    expect(body).to.be.an("object");
    expect(body.message).to.be.equal("Offer not found");
  });
});
