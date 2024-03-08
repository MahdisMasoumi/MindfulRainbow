const express = require("express");
const router = express.Router();
const RainbowRays = require("../models/rainbowRays");
const verifyToken = require("../middlewares/authMiddleware");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post("/", verifyToken, upload.single("image"), function (req, res) {
  const userId = req.userId;
  let rainbowRaysInfo = {};
  rainbowRaysInfo.date = req.body.date;
  rainbowRaysInfo.days = req.body.days;
  rainbowRaysInfo.images = req.file.filename;
  rainbowRaysInfo.notes = req.body.notes;
  rainbowRaysInfo.user_id = userId;
  RainbowRays.create(rainbowRaysInfo)
    .then(function (results) {
      res.status(200).send(results);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});
router.get("/", verifyToken, function (req, res) {
  const userId = req.userId;

  RainbowRays.findAll({ where: { user_id: userId } })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/:rainbowRayId", verifyToken, function (req, res) {
  let rainbowRayId = req.params.rainbowRayId;

  RainbowRays.findByPk(rainbowRayId)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.delete("/:rainbowRayId", verifyToken, function (req, res) {
  let rainbowRayId = parseInt(req.params.rainbowRayId);

  RainbowRays.findByPk(rainbowRayId)
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
        res.status(500).send("The Rainbow Rays ID does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

router.put(
  "/:rainbowRayId",
  verifyToken,
  upload.single("image"),
  function (req, res) {
    const rainbowRayId = parseInt(req.params.rainbowRayId);
    RainbowRays.findByPk(rainbowRayId).then(function (results) {
      if (results == undefined) {
        res.status(404).send("RainbowRay id does not exist");
      } else {
        results.date = req.body.date;
        results.days = req.body.days;
        results.images = req.file.filename;
        results.notes = req.body.notes;
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
  }
);

router.patch("/progress/:rainbowRayId", verifyToken, function (req, res) {
  let rainbowRayId = parseInt(req.params.rainbowRayId);

  RainbowRays.findByPk(rainbowRayId)
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
        res.status(404).send("The RainbowRays ID does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

module.exports = router;
