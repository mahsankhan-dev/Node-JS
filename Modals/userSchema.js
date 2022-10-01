const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const serverSecret = process.env.SECRET;

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
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  // tokens: {
  //   type: Array,
  //   default: [],
  // },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  // const user = this;
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

userSchema.methods.generateToken = function () {
  const user = this;
  const { _id } = user;
  const token = jwt.sign({ _id }, serverSecret);
  user.tokens = user.tokens.concat({ token: token });
  return user.save().then(() => token);
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
