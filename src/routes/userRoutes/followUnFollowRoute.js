const router = require("express").Router();

const getFollowUnfollowUser = require("../../controllers/User/FollowUnfollowUser");

/**
 * @swagger
 *
 * /users/userFollowUnfollow:
 *  post:
 *    description: We use this API to follow or un-follow.
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
  "/",
  getFollowUnfollowUser.validator,
  getFollowUnfollowUser.handler
);

module.exports = router;
