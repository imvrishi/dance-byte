const router = require("express").Router();

const getUserConnectionsList = require("../../controllers/User/GetUserConnectionsList");

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
  "/",
  getUserConnectionsList.validator,
  getUserConnectionsList.handler
);

module.exports = router;
