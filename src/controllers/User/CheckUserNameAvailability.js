const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const User = require("../../models/User");
const schema = require("../../util/validator");

const joiSchema = { ...schema };
joiSchema.userName = Joi.string().required();

exports.validator = validator.body(Joi.object(joiSchema));

exports.handler = async (req, res, next) => {
  const userName = req.body.userName;
  try {
    const param = { userName: userName };
    console.log(param);
    const user = await User.findOne(param);
    if (user === null) {
      return res.success("Available");
    }
    return res.fail("Not Available");
  } catch (error) {
    return res.exception("Something went wrong", error);
  }
};
