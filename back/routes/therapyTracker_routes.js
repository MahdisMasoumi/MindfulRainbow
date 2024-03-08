const express = require("express");
const router = express.Router();
const TherapyTracker = require("../models/therapyTracker");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", verifyToken, function (req, res) {
  const userId = req.userId;

  TherapyTracker.findAll({ where: { user_id: userId } })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/", verifyToken, function (req, res) {
  const userId = req.userId;
  let therapyTrackerInfo = {};
  therapyTrackerInfo.emotion_before = req.body.emotion_before;
  therapyTrackerInfo.emotion_after = req.body.emotion_after;
  therapyTrackerInfo.summary = req.body.summary;
  therapyTrackerInfo.reminder = req.body.reminder;
  therapyTrackerInfo.date = req.body.date;
  therapyTrackerInfo.user_id = userId;
  TherapyTracker.create(therapyTrackerInfo)
    .then(function (results) {
      res.status(200).send(results);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});
router.get("/:therapyId", function (req, res) {
  let therapyId = req.params.therapyId;

  TherapyTracker.findByPk(therapyId)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.delete("/:therapyId", function (req, res) {
  let therapyId = parseInt(req.params.therapyId);

  TherapyTracker.findByPk(therapyId)
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
        res.status(500).send("The TherapyTracker ID does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

router.put("/:therapyId", verifyToken, function (req, res) {
  const therapyId = parseInt(req.params.therapyId);
  TherapyTracker.findByPk(therapyId).then(function (results) {
    if (results == undefined) {
      res.status(404).send("TherapyTracker id does not exist");
    } else {
      results.emotion_before = req.body.emotion_before;
      results.emotion_after = req.body.emotion_after;
      results.summary = req.body.summary;
      results.reminder = req.body.reminder;
      results.date = req.body.date;
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

router.patch("/progress/:therapyId", function (req, res) {
  let therapyId = parseInt(req.params.therapyId);

  TherapyTracker.findByPk(therapyId)
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
        res.status(404).send("The TherapyTracker ID does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});
module.exports = router;
