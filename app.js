const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postsRoute = require("./routers/posts");
const jwtfile = require("./jsonwebtoken/jsonwebtoken");
const productsRoute = require("./routers/products");
const emailRoute = require("./routers/email");

// Hình ảnh start products
const multer = require("multer");
const path = require("path");
// Hình ảnh end

const cors = require("cors");
require("dotenv/config");
//Inport Routes
app.use(cors());
app.use(bodyParser.json());
app.use("/posts", postsRoute);
app.use("/products", productsRoute);
app.use("/email", emailRoute);
//Routes
app.get("/", (req, res) => {
  res.send("We are one home");
});
app.get("/posts", (req, res) => {
  res.send("We are one posts");
});

//Hình ảnh sroudce

// storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000000,
  },
});
app.use("/profile", express.static("upload/images"));
app.post(
  "/upload",
  jwtfile.verifyToken,
  upload.single("profile"),
  (req, res) => {
    res.json({
      success: 1,
      profile_url: `http://localhost:4004/profile/${req.file.filename}`,
    });
  }
);
function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
app.use(errHandler);

//Code sroudce

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("connected to db")
);
//How to we start Listening to the server
app.listen(3456);
