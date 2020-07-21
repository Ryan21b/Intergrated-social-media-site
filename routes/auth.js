const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_Secret } = require("../config/default.json");
const Login_req = require("../middleware/Login_req");

router.get("/protected", Login_req, (req, res) => {
  res.send("hello user");
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please fill all fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "Please try different email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "User added successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })

    .catch((err) => {
      console.log(err);
    });
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "please fill out both fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      res
        .status(422)
        .json({ error: "Invalid entry please correct email and password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //res.json({ message: "Login successful" });
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
