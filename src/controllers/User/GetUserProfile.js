const Joi = require("@hapi/joi");
const User = require("../../models/User");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const schema = Joi.object().keys({
  userId: Joi.string(),
});

exports.validator = validator.body(schema);

exports.handler = async (req, res, nex) => {
  const userId = req.body.userId;
  const fieldsToSelect =
    "userName firstName lastName fullName bio profilePicture email accountType userType totalFollowers totalFollowings status videos.uploaded";
  try {
    const user = await User.findById(userId).select(fieldsToSelect);

    if (user) {
      res.success("Requested user got successfully", user);
    } else {
      res.fail("You have provided wrong userId");
    }
  } catch (error) {
    res.fail("Requested user does not exists");
  }
};
