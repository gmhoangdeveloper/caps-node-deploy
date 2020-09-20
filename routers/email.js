const express = require("express");
const router = express.Router();
// require("dotenv").config();
const nodemailer = require("nodemailer");
const log = console.log;

router.post("/", async (req, res) => {
  // Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gmhoang.developer@gmail.com", // TODO: your gmail account
      pass: "Hoang@123", // TODO: your gmail password
    },
  });

  // Step 2
  let mailOptions = {
    from: "gmhoang.developer@gmail.com", // TODO: email sender
    to: req.body.title, // TODO: email receiver
    subject: "Tài Khoản Đăng Nhập WebSite GoatWhite",
    text: `Mật Khẩu của bạn là ${req.body.title} ${req.body.description}`,
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return log("Error occurs");
    }
    res.json(data);
    // return log("Email sent!!!", mailOptions);
  });
});

module.exports = router;
