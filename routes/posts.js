const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Login_req = require("../middleware/Login_req");
const Post = mongoose.model("Post");

router.get("/allposts", (req, res) => {
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
  const { title, body, img } = req.body;
  console.log(title, body, img);
  if (!title || !body || !img) {
    return res.status(422).json({ error: "Please complete all fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: img,
    postedBy: req.user,
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

router.get("/myposts", Login_req, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("PostedBy", "_id name")
    .then((myposts) => {
      res.send({ myposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
