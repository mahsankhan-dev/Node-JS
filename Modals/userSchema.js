const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  paswword: {
    type: String,
    required: true,
  },
  cpaswword: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;