const express = require("express");
const router = express.Router();
const { common } = require("../config");
const { getDB } = require('../util/database');

/* GET home page. */
router.get("/", function (req, res, next) {
  const db = getDB();
  res.send(common.APP_NAME);
});

router.get('/list', function(req, res, next) {
  res.send('video list');
});

module.exports = router;
