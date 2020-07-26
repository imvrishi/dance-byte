const router = require("express").Router();

const registerUser = require("../../controllers/User/RegisterUser");

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
router.post("/", registerUser.validator, registerUser.handler);

module.exports = router;
