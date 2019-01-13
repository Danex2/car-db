const request = require("supertest");
const mocha = require("mocha");
const assert = require("chai").assert;
const app = require("../index");

describe("Testing the response statuses of the routes", () => {
  it("GET: /car should return a 200 status code", done => {
    request(app)
      .get("/car")
      .set("Accept", "application/json")
      .expect(200)
      .then(res => {
        assert(res.statusCode === 200);
      });
    done();
  });
  it("POST: /car should return a 201 status code for successfully adding a car", done => {
    let carData = {
      make: "Toyota",
      model: "Supra",
      year: 1996
    };
    request(app)
      .post("/car")
      .send(carData)
      .then(res => {
        assert(res.statusCode === 201);
      });
    done();
  });
});
