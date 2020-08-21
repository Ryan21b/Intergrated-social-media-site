const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Login_req = require("../middleware/Login_req");
const { populate } = require("../shell/post");
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
    postedBy: req.user._id,
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
router.delete("/delpost", Login_req, (req, res) => {
  Post.findByIdAndDelete({ post: req.params.id });
});

router.delete("/:id", Login_req, (req, res) => {
  try {
    let post = Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    Post.findByIdAndRemove(req.params.id);

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/deletepost/:postId", Login_req, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});
module.exports = router;
