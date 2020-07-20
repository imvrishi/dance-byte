const Joi = require("@hapi/joi");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const User = require("../../models/User");
const schema = require("../../util/validator");

const joiSchema = { ...schema };
joiSchema.userId = Joi.string().required();
joiSchema.targetedUserId = Joi.string().required();
joiSchema.action = Joi.string().valid("follow", "un-follow").required();

exports.validator = validator.body(Joi.object().keys(joiSchema));

exports.handler = async (req, res, next) => {
  const userId = req.body.userId;
  const targetedUserId = req.body.targetedUserId;
  const action = req.body.action;

  try {
    const targetedUserData = await User.findById(targetedUserId).select(
      "userName fullName totalFollowers totalFollowings followers  followings"
    );
    const userData = await User.findById(userId).select(
      "userName fullName totalFollowers totalFollowings followers  followings"
    );

    // Setting the DB operation as per action.
    if (action === "follow") {
      targetedUserData.totalFollowers = targetedUserData.totalFollowers + +1;
      targetedUserData.followers.push({
        _id: userId,
        userName: userData.userName,
        fullName: userData.fullName,
        profilePicture: userData.profilePicture,
      });

      userData.totalFollowings = userData.totalFollowings + +1;
      userData.followings.push({
        _id: targetedUserId,
        userName: targetedUserData.userName,
        fullName: targetedUserData.fullName,
        profilePicture: targetedUserData.profilePicture,
      });
    } else {
      targetedUserData.totalFollowers = targetedUserData.totalFollowers - 1;
      targetedUserData.followers.pull(userId);

      userData.totalFollowings = userData.totalFollowings - 1;
      userData.followings.pull(targetedUserId);
    }

    // Preforming the operation on DB
    const userActionData = await targetedUserData.save();
    const targetActionData = await userData.save();
    if (userActionData && targetActionData) {
      return res.success("You have successfully " + action + "ed.", {
        userActionData: userActionData,
        targetActionData: targetActionData,
      });
    } else {
      return res.fail("There is some error to " + action + ".");
    }
  } catch (error) {
    return res.exception("Something went wrong", error);
  }
};
