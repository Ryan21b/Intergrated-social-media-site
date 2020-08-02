const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Login_req = require("../middleware/Login_req");
const Post = mongoose.model("Post");

router.get("/allpostsCoffin", Login_req, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/createpost", Login_req, (req, res) => {
  const { username, title, body, img } = req.body;
  if (!username || !title || !body || !img) {
    return res.status(422).json({ error: "Please complete all fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    username,
    title,
    body,
    photo: img,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
