const Joi = require("@hapi/joi");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const User = require("../../models/User");

const schema = Joi.object().keys({
  userId: Joi.string().required(),
  targetedUserId: Joi.string().required(),
  action: Joi.string().valid("follow", "un-follow").required(),
  // userName: Joi.string().required(),
  // fullName: Joi.string(),
  // profilePicture: Joi.string(),
});

exports.validator = validator.body(schema);

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

    if (action === "follow") {
      // Updating the following document
      targetedUserData.totalFollowers = targetedUserData.totalFollowers + +1;
      targetedUserData.followers.push({
        _id: userId,
        userName: userData.userName,
        fullName: userData.fullName,
        profilePicture: userData.profilePicture,
      });

      // updating the follower document
      userData.totalFollowings = userData.totalFollowings + +1;
      userData.followings.push({
        _id: targetedUserId,
        userName: targetedUserData.userName,
        fullName: targetedUserData.fullName,
        profilePicture: targetedUserData.profilePicture,
      });

      const userFollowing = await targetedUserData.save();
      const userFollower = await userData.save();

      if (userFollowing && userFollower) {
        return res.success("You have successfully followed.", {
          followingData: userFollowing,
          followerData: userFollower,
        });
      } else {
        return res.fail("There is some error to follow.");
      }
    } else {
      targetedUserData.totalFollowers = targetedUserData.totalFollowers - 1;
      targetedUserData.followers.pull(userId);

      userData.totalFollowings = userData.totalFollowings - 1;
      userData.followings.pull(targetedUserId);

      const userUnFollowing = await targetedUserData.save();
      const userUnFollower = await userData.save();

      if (userUnFollowing && userUnFollower) {
        return res.success("You have successfully un-followed.", {
          followingData: userUnFollowing,
          followerData: userUnFollower,
        });
      } else {
        return res.fail("There is some error to un-follow.");
      }
    }
  } catch (error) {
    return res.fail("There is some error in query", error);
  }
};
