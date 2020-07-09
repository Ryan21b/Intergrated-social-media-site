const express = require("express");
const router = express.Router();

connectDB();
router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register"),
  (req, res) => {
    console.log(req.body);
  };
module.expor