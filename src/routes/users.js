const express = require("express");
const router = express.Router();
const { common } = require("../config");
const dbcon = require('../util/database');

/* GET home page. */
router.get("/", function (req, res, next) {
  //const db = getDB();
  res.send(common.APP_NAME);
});

router.get('/profile', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
