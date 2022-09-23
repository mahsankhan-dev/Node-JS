const mongoose = require("mongoose");

const db = process.env.DATABASE;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log("Conected Error", err));
