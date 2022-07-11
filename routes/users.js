const express = require("express");
const router = express.Router();
const { User } = require("./../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: "username not found",
    });
  } else {
    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (verifyPassword) {
      delete user.dataValues.password;
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "success",
        data: token,
      });
    } else {
      return res.status(401).json({
        message: "password wrong",
      });
    }
  }
});

router.post("/register", async function (req, res, next) {
  const { name, email, phoneNumber, dateOfBirth, username, password } =
    req.body;
  const usernameOnDatabase = await User.findOne({
    where: {
      username: username,
    },
  });

  if (usernameOnDatabase) {
    return res.status(401).json({
      message: "username has been registered",
    });
  }

  const emailOnDatabase = await User.findOne({
    where: {
      email: email,
    },
  });

  if (emailOnDatabase) {
    return res.status(401).json({
      message: "email has been registered",
    });
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  const user = await User.create({
    name: name,
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth,
    password: hashPassword,
    role: "citizen",
    statusVaccine: "No Vaccine",
    statusCovid: "Negative",
  });
  delete user.dataValues.password;

  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  return res.status(200).json({
    message: "success",
    data: token,
  });
});

module.exports = router;
