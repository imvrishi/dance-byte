const Joi = require("@hapi/joi");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const User = require("../../models/User");
const common = require("../../config/common");
const schema = require("../../util/validator");

const joiSchema = { ...schema };
joiSchema.userId = Joi.string().required();
joiSchema.connection = Joi.string()
  .valid("followers", "followings", "blockedUsers")
  .required();

exports.validator = validator.body(Joi.object().keys(joiSchema));

exports.handler = async (req, res, next) => {
  const userId = req.body.userId;
  const connection = req.body.connection;
  const limit = req.body.limit || common.PER_PAGE_LIMIT;
  const connectionUpper =
    connection.charAt(0).toUpperCase() + connection.slice(1);
  const offset = (req.body.offset || common.PER_PAGE_OFFSET - 1) * limit;

  try {
    const user = await User.findById(userId)
      .select("total" + connectionUpper + " " + connection)
      .populate(connection)
      .skip(offset)
      .limit(limit);

    if (user) {
      return res.success(connectionUpper + " list fetched successfully.", user);
    } else {
      return res.fail("Sorry you don't have " + connection + ".");
    }
  } catch (error) {
    return res.exception("Something went wrong", error);
  }
};
