const express = require("express");
const morgan = require("morgan");
const { json, urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const connect = require("./connect");
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
    res.status(500).json(e._message);
  }
});

app.get("/", (req, res) => {
  res.send("API works");
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
    res.status(500).send(e._message);
  }
});

/*connect("mongodb://mongo:27017/car-db").then(() =>
  app.listen(provess.env.PORT, () => console.log("Listening on port: 4000"))
);*/
app.listen(process.env.PORT, () => console.log("Running."));

module.exports = app;
