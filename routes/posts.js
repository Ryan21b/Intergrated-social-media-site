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
router.post("/createpostCoffin", Login_req, (req, res) => {
  const { title, body, img } = req.body;
  if (!title || !body || !img) {
    return res.status(422).json({ error: "Please complete all fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: img,
    postedBy,
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

router.get("/mypostsCoffin", Login_req, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("PostedBy", "_id name")
    .then((myposts) => {
      res.send({ myposts });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.put("/heart", Login_req, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { hearts: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});
router.put("/unlike", Login_req, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", Login_req, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
module.exports = router;
