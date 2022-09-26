const express = require("express");
const router = express.Router();
const user = require("../Modals/userSchema");

require("../config/db");

router.get("/", (req, res) => {
  res.send("Hello Home Page");
});

router.post("/register", (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  // console.log(email);

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "empty filed not allowed" });
  }

  user
    .findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ eror: "User already exist" });
      }

      const newUser = new user(req.body);
      newUser
        .save()
        .then(() =>
          res.status(201).json({ message: "user register successfully" })
        )
        .catch((err) => res.status(500).json({ err: "error" }));
    })
    .catch((err) => {
      console.log(err);
    });

  // res.json({ message: req.body });
});

module.exports = router;
