const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_Secret } = require("../config/default.json");

router.post("/registerCoffin", (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  if (!name || !email || !password || !confirmpassword) {
    return res.status(422).json({ error: "Please fill all fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Please try different email" });
    }
    User.findOne({ confirmpassword: password }).then((savedUser) => {
      if (savedUser) {
        return res.json({ error: "Passwords do not match" });
      }
    });
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const user = new User({
        name,
        email,
        password: hashedpassword,
        confirmpassword: password,
      });

      user
        .save()
        .then((user) => {
          res.send("REGISTERED SUCCESSFULLY");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
router.post("/loginCoffin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "please fill out both fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      res
        .status(422)
        .json({ error: "Invalid entry ,please correct email and password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, jwt_Secret);
          const { _id, name, email } = savedUser;
          res.json({ token, user: { _id, name, email } });
        } else {
          return res.status(422).json({ error: "Invalid password or email" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
