const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/profile", verifyToken, function (req, res) {
  const userId = req.userId;

  User.findByPk(userId)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
