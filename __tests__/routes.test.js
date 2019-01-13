const request = require("supertest");
const assert = require("assert");
const app = require("../index");
const expect = require("chai").expect;

describe("Testing the response statuses of the routes", () => {
  it("GET: /car should return a 200 status code", done => {
    request(app)
      .get("/car")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("POST: /car should return a 201 status code for successfully adding a car", done => {
    let carData = {
      make: "Toyota",
      model: "Supra34",
      year: 1996
    };
    request(app)
      .post("/car")
      .send(carData)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
});
