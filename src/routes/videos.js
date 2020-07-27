const express = require("express");
const router = express.Router();
const { common } = require("../config");
const { getDB } = require("../util/database");

router.get("/", function (req, res, next) {
  const db = getDB();
  res.send({ message: "get videos list" });
});

router.get("/:id", function (req, res, next) {
  res.send({ message: "get particular video" });
});

module.exports = router;
