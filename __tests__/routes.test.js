const request = require("supertest");
const expect = require("chai").expect;
const Car = require("../models/car");
const connect = require("../connect");
const app = require("../index");

const url = "http://localhost:4000";

before(done => {
  connect("mongodb://localhost:27017/car-db").then(() => {
    console.log("DB Running.");
  });
  app.listen(process.env.port || 4000, () => {
    console.log("App running.");
  });
  done();
});

after(done => {
  Car.deleteMany({}).exec();
  process.exit();
  done();
});

describe("Testing the response statuses of the routes", () => {
  it("GET: /car should return a 200 status code", done => {
    request(url)
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
    request(url)
      .post("/car")
      .send(carData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        done();
      });
  });
  it("GET: /doesnotexist should return a 404 for a route that does not exist", done => {
    request(url)
      .get("/doesnotexist")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        done();
      });
  });
  it("POST: /car should return an error for incomplete data", done => {
    let badData = {
      make: "Toyota",
      model: "Supra"
    };
    request(url)
      .post("/car")
      .send(badData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(500);
        done();
      });
  });
});
