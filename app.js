const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = express();
// const User = require("./Modals/userSchema");

require("./config/db");
app.use(express.json());

// link router files
app.use(require("./Router/router"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`runing in ${port}`);
});

// const middleware = (req, res, next) => {
//   console.log("hello middleware");
//   next();
// };

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
