const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
// const db = require("./config/db");
const app = express();

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE;
const port = process.env.PORT;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log("Conected Error", err));

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
