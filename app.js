const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// add config in dotenv
dotenv.config({ path: "./config.env" });
// add database file
require("./config/db");
const User = require("./Modals/userSchema");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`running in ${port}`);
});

const middleware = (req, res, next) => {
  console.log("hello middleware");
  next();
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/ads", middleware, (req, res) => {
  res.send("This is ads");
  console.log("Hello ads");
});

app.get("/users", (req, res) => {
  res.send("This is users");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
