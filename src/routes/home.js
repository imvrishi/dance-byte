const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({
    message: "This route is reserved for documentation",
  });
});

module.exports = router;
