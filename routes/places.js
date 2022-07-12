const express = require("express");
const router = express.Router();
const { Place, HistoryVisiting } = require("./../models");
const { auth } = require("../middleware/auth");

router.post("/register", async function (req, res, next) {
  const { name, location } = req.body;
  const place = await Place.create({
    name: name,
    location: location,
  });
  return res.status(200).json({
    message: "success",
    data: place,
  });
});

router.post("/check-in/:place_id", auth, async function (req, res, next) {
  const { place_id } = req.params;

  const lastHistoryVisiting = await HistoryVisiting.findOne({
    attributes: [
      "id",
      "user_id",
      "place_id",
      "start_time",
      "end_time",
      "createdAt",
      "updatedAt",
    ],
    where: {
      user_id: req.user.id,
    },

    order: [["createdAt", "DESC"]],
  });

  await lastHistoryVisiting.update({
    end_time: Date.now(),
  });

  const createHistoryVisiting = await HistoryVisiting.create({
    user_id: req.user.id,
    place_id: place_id,
    start_time: Date.now(),
  });

  return res.json({
    message: "Sucess Check In",
    data: createHistoryVisiting,
  });
});
router.post("/check-out/:place_id", auth, async function (req, res, next) {
  const { place_id } = req.params;

  const lastHistoryVisiting = await HistoryVisiting.findOne({
    attributes: [
      "id",
      "user_id",
      "place_id",
      "start_time",
      "end_time",
      "createdAt",
      "updatedAt",
    ],
    where: {
      user_id: req.user.id,
      place_id: place_id,
    },
    order: [["createdAt", "DESC"]],
  });

  const updatedHistoryVisiting = await lastHistoryVisiting.update({
    end_time: Date.now(),
  });

  return res.json({
    message: "Sucess Check Out",
    data: updatedHistoryVisiting,
  });
});

module.exports = router;
