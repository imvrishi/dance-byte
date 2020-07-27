const router = require("express").Router();
const users = require("./userRoutes");
const videos = require("./videos");
const home = require("./home");

router.use("/", home);
router.use("/users", users);
router.use("/videos", videos);

module.exports = router;
