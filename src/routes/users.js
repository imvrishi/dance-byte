const router = require("express").Router();

const verifyUserName = require("../controllers/User");
const userController = require("../controllers/UserController");

/* GET home page. */
router.get("/", userController.registerUser);

router.post("/", userController.postRegisterUser);

/**
 * Every route should have its own validator and handler
 */
router.post(
  "/verifyUserName",
  verifyUserName.validator,
  verifyUserName.handler
);

router.get("/profile", function (req, res, next) {
  res.json({ message: "get users profile" });
});

module.exports = router;
