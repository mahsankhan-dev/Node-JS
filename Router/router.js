const express = require("express");
const router = express.Router();
const user = require("../Modals/userSchema");
const bcrypt = require("bcryptjs");

require("../config/db");

router.get("/", (req, res) => {
  res.send("Hello Home Page");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  console.log();
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Empty field not allowed" });
  }

  try {
    const userExist = await user.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ eror: "User already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ eror: "password does not match" });
    } else {
      const newUser = new user(req.body);
      await newUser.save();
      res.status(201).json({ message: "user register successfully" });
    }
  } catch {
    (err) => console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Empty filed not allowed" });
    }

    const userLogin = await user.findOne({ email: email });
    console.log(userLogin);

    if (userLogin) {
      const passwordMatch = await bcrypt.compare(password, userLogin.password);
      if (passwordMatch) {
        res.json({ message: "user signin successfull" });
        console.log("passwordMatch", passwordMatch);
      } else {
        res.status(400).json({ error: "invalid data pass" });
      }
    } else {
      res.status(400).json({ error: "invalid data email" });
    }

    const token = await userLogin.generateToken();
    console.log("token ---> ", token);
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
