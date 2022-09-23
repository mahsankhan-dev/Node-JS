const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
// const db = require("./config/db");
const app = express();

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log("Conected Error", err));

app.listen(3000, () => {
  console.log("running in 3000");
});

const middleware = (req, res, next) => {
  console.log("middleware jani");
  next();
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/ads", middleware, (req, res) => {
  res.send("This is ads");
});

app.get("/users", (req, res) => {
  res.send("This is users");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
