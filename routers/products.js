const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Products = require("../models/products");
const jwtfile = require("../jsonwebtoken/jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const posts = await Products.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const products = new Products({
    id: req.body.title,
    title: req.body.title,
    description: req.body.description,
    image1: req.body.image1,
    image2: req.body.image2,
    price: req.body.price,
    quantity: req.body.quantity,
    size: req.body.size,
    status: req.body.status,
  });
  try {
    const savedProducts = await products.save();
    res.json(savedProducts);
  } catch (err) {
    res.json({ message: err });
  }
});
// router.get("/:postId", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.postId);
//     res.json(post);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
// router.delete("/:postId", jwtfile.verifyToken, async (req, res) => {
//   try {
//     const removedPost = await Post.remove({ _id: req.params.postId });
//     res.json(removedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
// router.patch("/:postId", async (req, res) => {
//   try {
//     const updatedPost = await Post.updateOne(
//       { _id: req.params.postId },
//       {
//         $set: { title: req.body.title, description: req.body.description },
//       }
//     );
//     res.json(updatedPost);
//     res.json(removedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

module.exports = router;
