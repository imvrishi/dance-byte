const router = require("express").Router();

const availabilityRoute = require("./availabilityRoute");
const profileRoute = require("./profileRoute");
const userVideosRoute = require("./userVideosRoute");
const followUnFollowRoute = require("./followUnFollowRoute");
const connectionsRoute = require("./connectionsRoute");
const registerUseRouter = require("./registerUseRouter");
const updateUserProfileRoute = require("./updateUserProfileRoute");

router.use("/checkUserNameAvailability", availabilityRoute);

router.use("/getUserProfile", profileRoute);

router.use("/getUserConnections", connectionsRoute);

router.use("/getUserVideos", userVideosRoute);

router.use("/userFollowUnfollow", followUnFollowRoute);

router.use("/registerUser", registerUseRouter);

router.use("/updateUserProfile", updateUserProfileRoute);

module.exports = router;
