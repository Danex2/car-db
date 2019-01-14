const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;
const Car = require("../models/car");

describe("Testing the response statuses of the routes", () => {
  beforeEach(done => {
    Car.deleteMany({}, err => {
      done();
    });
  });

  it("GET: /car should return a 200 status code", done => {
    request(app)
      .get("/car")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("POST: /car should return a 201 status code for successfully adding a car", done => {
    let carData = {
      make: "Toyota",
      model: "Supra",
      year: 1994
    };
    request(app)
      .post("/car")
      .send(carData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        done();
      });
  });
  it("Should return a 404 for a route that does not exist", done => {
    request(app)
      .get("/doesnotexist")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        done();
      });
  });
});
