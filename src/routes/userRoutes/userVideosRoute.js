const router = require("express").Router();

const getUserVideosList = require("../../controllers/User/GetUserVideosList");

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
router.post("/", getUserVideosList.validator, getUserVideosList.handler);

module.exports = router;
