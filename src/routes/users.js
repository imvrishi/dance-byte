const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

/* GET home page. */
router.get("/", userController.registerUser);

router.post("/", userController.postRegisterUser);

router.post("/verifyUserName", userController.postVerifyUserName);

router.get("/profile", function (req, res, next) {
  res.json({ message: "get users profile" });
});

module.exports = router;
