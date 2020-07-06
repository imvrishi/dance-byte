const express = require("express");
const router = express.Router();
const { common } = require("../config");
const { getDB } = require("../util/database");

router.get("/", function (req, res, next) {
  const db = getDB();
  res.json({ message: "get users list" });
});

router.get("/profile", function (req, res, next) {
  res.json({ message: "get users profile" });
});

module.exports = router;
