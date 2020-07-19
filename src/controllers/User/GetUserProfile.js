const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const User = require("../../models/User");

const schema = require("../../util/validator");

const joiSchema = { ...schema };
joiSchema.userId = Joi.string().required();

exports.validator = validator.body(joiSchema);

exports.handler = async (req, res, nex) => {
  const userId = req.body.userId;
  const fieldsToSelect =
    "userName firstName lastName fullName bio profilePicture email accountType userType totalFollowers totalFollowings status";
  try {
    const user = await User.findById(userId).select(fieldsToSelect);

    if (user) {
      res.success("Requested user got successfully", user);
    } else {
      res.fail("You have provided wrong userId");
    }
  } catch (error) {
    return res.exception("Something went wrong", error);
  }
};
