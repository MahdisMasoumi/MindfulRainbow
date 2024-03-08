const express = require("express");
const router = express.Router();
const MoodTracking = require("../models/moodTracking");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", verifyToken, function (req, res) {
  const userId = req.userId;
  let moodTrackingInfo = {};
  moodTrackingInfo.emoji_img = req.body.emoji_img;
  moodTrackingInfo.date = req.body.date;
  moodTrackingInfo.notes = req.body.notes;
  moodTrackingInfo.intensity = req.body.intensity;
  moodTrackingInfo.user_id = userId;
  MoodTracking.create(moodTrackingInfo)
    .then(function (results) {
      res.status(200).send(results);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

router.get("/", verifyToken, function (req, res) {
  const userId = req.userId;

  MoodTracking.findAll({ where: { user_id: userId } })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/:moodTrackingId", function (req, res) {
  let moodTrackingId = req.params.moodTrackingId;

  MoodTracking.findByPk(moodTrackingId)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.delete("/:moodTrackingId", function (req, res) {
  let moodTrackingId = parseInt(req.params.moodTrackingId);

  MoodTracking.findByPk(moodTrackingId)
    .then(function (results) {
      if (results) {
        results
          .destroy()
          .then(function (result) {
            res.status(200).send(result);
          })
          .catch(function (error) {
            res.status(500).send(error);
          });
      } else {
        res.status(500).send("The moodTracking ID does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

router.put("/:moodTrackingId", verifyToken, function (req, res) {
  const moodTrackingId = parseInt(req.params.moodTrackingId);
  MoodTracking.findByPk(moodTrackingId).then(function (results) {
    if (results == undefined) {
      res.status(404).send("MoodTracking id does not exist");
    } else {
      results.emoji_img = req.body.emoji_img;
      results.date = req.body.date;
      results.notes = req.body.notes;
      results.intensity = req.body.intensity;
      results
        .save()
        .then(function (result) {
          res.status(200).send(result);
        })
        .catch(function (error) {
          res.status(500).send(error);
        });
    }
  });
});

router.patch("/progress/:moodTrackingId", function (req, res) {
  let moodTrackingId = parseInt(req.params.moodTrackingId);

  MoodTracking.findByPk(moodTrackingId)
    .then(function (results) {
      if (results) {
        results.progress = req.body.progress || results.progress;
        results
          .save()
          .then(function (result) {
            res.status(200).send(result);
          })
          .catch(function (error) {
            res.status(500).send(error);
          });
      } else {
        res.status(404).send("The MoodTracking ID does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

module.exports = router;
