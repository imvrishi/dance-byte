const router = require("express").Router();

const verifyUserName = require("../controllers/User/VerifyUserName");
const getUserProfile = require("../controllers/User/GetUserProfile");
const getUserVideosList = require("../controllers/User/GetUserVideosList");
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

/**
 * @swagger
 *
 * /users/getUserConnections:
 *  post:
 *    description: Gets the followers/followings list of provided userId
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: userId to get followers/followings list
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: connection
 *        description: In this field you have to provide either followers or followings so that we provide concerning list
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: limit
 *        description: limit to get followers/followings list with pagination. If you don't provide this by default this will get value from config.
 *        in: rawJson
 *        required: false
 *        type: number
 *
 *      - name: offset
 *        description: offset to get followers/followings list with pagination. If you don't provide this by default this will get value from config.
 *        in: rawJson
 *        required: false
 *        type: number
 *    responses:
 *      200:
 *        description: Returns string Followers/Followings List fetched successfully with followers/followings list array or Sorry you don't have followers/followings.
 *      400:
 *        description: Returns validation error
 *    tags:
 *      - user
 *
 */
router.post(
  "/getUserConnections",
  getUserConnectionsList.validator,
  getUserConnectionsList.handler
);

/**
 * @swagger
 *
 * /users/getUserVideos:
 *  post:
 *    description: Gets the liked/uploaded videos list of provided userId
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: userId to get liked/uploaded videos list
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: videosType
 *        description: In this field you have to provide either uploaded or liked so that we provide concerning list
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: limit
 *        description: limit to get liked/uploaded videos list with pagination. If you don't provide this by default this will get value from config.
 *        in: rawJson
 *        required: false
 *        type: number
 *
 *      - name: offset
 *        description: offset to get liked/uploaded videos list with pagination. If you don't provide this by default this will get value from config.
 *        in: rawJson
 *        required: false
 *        type: number
 *    responses:
 *      200:
 *        description: Returns string Liked/Uploaded videos list fetched successfully (with liked/uploaded videos list array) or Sorry you don't have liked/uploaded any video.
 *      400:
 *        description: Returns validation error
 *    tags:
 *      - user
 *
 */
router.post(
  "/getUserVideos",
  getUserVideosList.validator,
  getUserVideosList.handler
);

module.exports = router;
