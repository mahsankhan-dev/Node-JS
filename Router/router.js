const express = require("express");
const router = express.Router();
const user = require("../Modals/userSchema");

require("../config/db");

router.get("/", (req, res) => {
  res.send("Hello Home Page");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Empty field not allowed" });
  }

  try {
    const userExist = await user.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ eror: "User already exist" });
    }

    const newUser = new user(req.body);
    await newUser.save();
    res.status(201).json({ message: "user register successfully" });
  } catch {
    (err) => console.log(err);
  }
});

module.exports = router;
