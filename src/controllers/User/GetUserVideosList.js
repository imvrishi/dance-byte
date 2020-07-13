const Joi = require("@hapi/joi");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const User = require("../../models/User");
const common = require("../../config/common");

const schema = Joi.object().keys({
  userId: Joi.string().required(),
  videosType: Joi.string().valid("uploaded", "liked").required(),
  limit: Joi.number().positive().greater(0),
  offset: Joi.number().positive().min(0),
});

exports.validator = validator.body(schema);

exports.handler = async (req, res, next) => {
  const userId = req.body.userId;
  const videosType = req.body.videosType;
  const videosTypeUpper =
    videosType.charAt(0).toUpperCase() + videosType.slice(1);
  const limit = req.body.limit || common.PER_PAGE_LIMIT;
  const offset = req.body.offset || common.PER_PAGE_OFFSET;

  try {
    const userVideos = await User.findById(userId)
      .select("videos." + videosType)
      .populate(videosType)
      .skip(offset)
      .limit(limit);

    if (userVideos) {
      return res.success(
        videosTypeUpper + " videos list fetched successfully.",
        userVideos
      );
    } else {
      return res.fail("Sorry you don't have " + videosType + " any video.");
    }
  } catch (error) {
    return res.fail("Sorry you don't have " + videosType + " any video.");
  }
};
