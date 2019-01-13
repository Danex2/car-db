const express = require("express");
const morgan = require("morgan");
const { json, urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const app = express();
mongoose.Promise = global.Promise;
const Car = require("./models/car");

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

// Get all cars
app.get("/car", async (req, res) => {
  try {
    const cars = await Car.find({}).exec();
    res.status(200).json(cars);
  } catch (e) {
    res.send(e._message);
  }
});

// Add a car to the db
app.post("/car", async (req, res) => {
  const carData = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year
  };
  try {
    const car = await Car.create(carData);
    res.status(201).json(car.toJSON());
  } catch (e) {
    res.send(e._message);
  }
});

// the before function is from mocha and it tells it  what to do before running tests, use ``done()`` to say when it should move on to the tests.
before(done => {
  mongoose
    .connect(
      "mongodb://localhost:27017/car-db",
      { useNewUrlParser: true }
    )
    .then(() => app.listen(4000, () => console.log("Listening on port: 4000")));
  done();
});

// after is more or less the same. After the tests are run I want to exit
after(() => {
  process.exit();
});

module.exports = app;
