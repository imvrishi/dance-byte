const router = require("express").Router();

const verifyUserName = require("../controllers/User/VerifyUserName");
const getUserProfile = require("../controllers/User/GetUserProfile");
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

/**
 * @swagger
 *
 * /users/getUserProfile:
 *  post:
 *    description: Gets the profile of provided userId
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: userId to get profile
 *        in: rawJson
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Returns string Requested user got successfully or You have provided wrong userId
 *      400:
 *        description: Returns validation error
 *    tags:
 *      - user
 *
 */
router.post(
  "/getUserProfile",
  getUserProfile.validator,
  getUserProfile.handler
);

router.get("/profile", function (req, res, next) {
  res.json({ message: "get users profile" });
});

module.exports = router;
