const express = require("express");
const router = express.Router();
const { Place } = require("./../models");

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

router.post("/check-in", async function (req, res, next) {
  //cara cari siapa yang sedang login
  //cara kirim location id
});
router.post("/check-out", async function (req, res, next) {
  //cara cari siapa yang sedang login
  //cara kirim location id
});

module.exports = router;
