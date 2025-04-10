const express = require("express");
const router = express.Router();
const RainbowGoals = require("../models/rainbowGoals");
const verifyToken = require("../middlewares/authMiddleware");

let rainbowGoals = [];

router.get("/", verifyToken, function (req, res) {
  const userId = req.userId;

  RainbowGoals.findAll({ where: { user_id: userId } })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/:goalId", function (req, res) {
  let goalId = req.params.goalId;

  RainbowGoals.findByPk(goalId)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/", verifyToken, function (req, res) {
  const userId = req.userId;
  let rainbowGoalsInfo = {};
  rainbowGoalsInfo.start_date = req.body.start_date;
  rainbowGoalsInfo.target_date = req.body.target_date;
  rainbowGoalsInfo.goal_name = req.body.goal_name;
  rainbowGoalsInfo.category = req.body.category;
  rainbowGoalsInfo.milestones = req.body.milestones;
  rainbowGoalsInfo.summary = req.body.summary;
  // rainbowGoalsInfo.completion_status = req.body.completion_status;
  rainbowGoalsInfo.user_id = userId;

  RainbowGoals.create(rainbowGoalsInfo)
    .then(function (results) {
      res.status(200).send(results);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});
router.delete("/:goalId", function (req, res) {
  let goalId = parseInt(req.params.goalId);

  RainbowGoals.findByPk(goalId)
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
        res.status(500).send("The RainbowGoals ID does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

router.put("/:goalId", verifyToken, function (req, res) {
  const goalId = parseInt(req.params.goalId);
  RainbowGoals.findByPk(goalId).then(function (results) {
    if (results == undefined) {
      res.status(404).send("RainbowGoals id does not exist");
    } else {
      results.start_date = req.body.start_date;
      results.target_date = req.body.target_date;
      results.goal_name = req.body.goal_name;
      results.category = req.body.category;
      results.milestones = req.body.milestones;
      results.summary = req.body.summary;
      // results.completion_status = req.body.completion_status;
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

router.patch("/progress/:goalId", function (req, res) {
  let goalId = parseInt(req.params.goalId);

  RainbowGoals.findByPk(goalId)
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
        res.status(404).send("The RainbowGoals ID does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});
module.exports = router;
