const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

router.post("/register", function (req, res) {
  const userData = req.body;

  bcrypt.hash(userData.password, 10, (err, hash) => {
    userData.password = hash;

    User.create(userData)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
});

router.post("/login", function (req, res) {
  console.log("Received login request");

  const { email, password } = req.body;

  User.findOne({ where: { email } }).then(result => {
    if (!result) {
      res.status(404).send("User not found");
      return;
    }

    bcrypt.compare(password, result.password, (err, match) => {
      if (!match) {
        return res.status(401).send("Authentication failed");
      }

      const token = jwt.sign({ userId: result.id }, "123456", {
        expiresIn: "1h",
      });
      res.status(200).send({ token });
    });
  });
});

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// var upload = multer({ storage: storage });
module.exports = router;
