const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  auth: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
      if (decoded) {
        req.user = decoded.user;
        next();
      }
    } catch (error) {
      res.json({
        message: "Invalid Token",
      });
    }
  },
};
