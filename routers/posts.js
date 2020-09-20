const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const jwtfile = require("../jsonwebtoken/jsonwebtoken");

router.get("/", jwtfile.verifyToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});


router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:postId",jwtfile.verifyToken, async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: { title: req.body.title, description: req.body.description },
      }
    );
    res.json(updatedPost);
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "GiangMinhHoang",
    email: "giangminhhoang999@gmail.com",
  };
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authourization"];
  console.log("bearerHeader", bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = router;
