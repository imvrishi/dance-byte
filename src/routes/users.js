const router = require("express").Router();

const verifyUserName = require("../controllers/User/VerifyUserName");
const getUserProfile = require("../controllers/User/GetUserProfile");
const getUserVideosList = require("../controllers/User/GetUserVideosList");
const getFollowUnfollowUser = require("../controllers/User/FollowUnfollowUser");
const getUserConnectionsList = require("../controllers/User/GetUserConnectionsList");
const userController = require("../controllers/UserController");
const registerUser = require("../controllers/User/RegisterUser");

router.get("/", userController.registerUser);

router.post("/", userController.postRegisterUser);

/**
 * @swagger
 *
 * /users/  "/checkUserNameAvailability",
:
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
  "/checkUserNameAvailability",
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
 */
router.post(
  "/getUserVideos",
  getUserVideosList.validator,
  getUserVideosList.handler
);

/**
 * @swagger
 *
 * /users/userFollowUnfollow:
 *  post:
 *    description:We use this API to follow or un-follow.
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: Which user is trying to follow/un-follow, we need their UserId.
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: targetedUserId
 *        description: The UserId of that user who will be followed/un-followed by userId, we need their userId as targetedUserId.
 *        in: rawJson
 *        required: true
 *        type: number
 *
 *      - name: action
 *        description: This param will hold follow or un-follow string as value, as per request need.
 *        in: rawJson
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: Returns string You have successfully followed/un-followed along with data array or There is some error to follow/un-follow.
 *      400:
 *        description: Returns validation error
 *    tags:
 *      - user
 */

router.post(
  "/userFollowUnfollow",
  getFollowUnfollowUser.validator,
  getFollowUnfollowUser.handler
);

/**
 *  @swagger
 *
 * /users/registerUser:
 *  post:
 *    description: Verifies whether the passed username is available or not
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userName
 *        description: Enter Username
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: mobile
 *        description: Enter mobile
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: countryCode
 *        description: select countryCode of user
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: authenticatedToken
 *        description: add authenticatedToken
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: accountType
 *        description: add accountType
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: interests
 *        description: minimum 1 interests added
 *        in: rawJson
 *        required: true
 *        type: array
 *
 *      - name: deviceId
 *        description: select user deviceId
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: deviceModel
 *        description: select user deviceModel
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: deviceOS
 *        description: select user deviceOS
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: deviceOSVersion
 *        description: select user deviceOSVersion
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: apiVersion
 *        description: select user apiVersion
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: deviceName
 *        description: select user deviceName
 *        in: rawJson
 *        required: true
 *        type: string
 *
 *      - name: latitude
 *        description: select latitude
 *        in: rawJson
 *        required: false
 *        type: string
 *
 *      - name: longitude
 *        description: select longitude
 *        in: rawJson
 *        required: false
 *        type: string
 *
 *      - name: country
 *        description: seelct country
 *        in: rawJson
 *        required: false
 *        type: string
 *
 *      - name: state
 *        description: select state
 *        in: rawJson
 *        required: false
 *        type: string
 *
 *      - name: region
 *        description: select region
 *        in: rawJson
 *        required: false
 *        type: string
 *    responses:
 *      200:
 *        description: Returns string Insert
 *      400:
 *        description: Returns validation error
 *    tags:
 *      - user
 */
router.post("/registerUser", registerUser.validator, registerUser.handler);

module.exports = router;
