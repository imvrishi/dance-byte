const router = require("express").Router();

const verifyUserName = require("../controllers/User/VerifyUserName");
const userController = require("../controllers/UserController");

router.get("/", userController.registerUser);

router.post("/", userController.postRegisterUser);

/**
 * @swagger
 *
 * /users/verifyUserName:
 *  post:
 *    description: Verifies whether the passed username is available or not
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userName
 *        description: Username to check for availability
 *        in: rawJson
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Returns string Available or Not Available
 *      400:
 *        description: Returns validation error
 *    tags:
 *      - user
 *
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
