const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const User = require("../../models/User");

const schema = require("../../util/validator");

const joiSchema = { ...schema };
joiSchema.fromUserId = Joi.string().required();
joiSchema.toUserId = Joi.string().required();

exports.validator = validator.body(Joi.object().keys(joiSchema));

exports.handler = async (req, res, nex) => {
  const fromUserId = req.body.fromUserId;
  const toUserId = req.body.toUserId;
  const fieldsToSelect =
    "userName firstName lastName fullName bio profilePicture email accountType userType totalFollowers totalFollowings status";
  try {
    let user;
    if (fromUserId === toUserId) {
      user = await User.findById(fromUserId).select(fieldsToSelect);
    } else {
      // fieldsToSelect += fieldsToSelect + " followers followings";
      user = await User.findById(toUserId, {
        userName: 1,
        firstName: 1,
        lastName: 1,
        fullName: 1,
        bio: 1,
        profilePicture: 1,
        email: 1,
        accountType: 1,
        userType: 1,
        totalFollowers: 1,
        totalFollowings: 1,
        status: 1,
        followers: { $elemMatch: { _id: fromUserId } },
        followings: { $elemMatch: { _id: fromUserId } },
      });
    }
    if (user) {
      res.success("Requested user got successfully", user);
    } else {
      res.fail("You have provided wrong userId");
    }
  } catch (error) {
    return res.exception("Something went wrong", error);
  }
};
