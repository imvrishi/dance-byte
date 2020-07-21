const router = require("express").Router();

const checkUserNameAvailability = require("../../controllers/User/CheckUserNameAvailability");

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
  "/",
  checkUserNameAvailability.validator,
  checkUserNameAvailability.handler
);

module.exports = router;
