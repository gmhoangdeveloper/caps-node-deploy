const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
//   id: {
//     type: Number,
//     required: true,
//   },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("products", PostSchema);
