const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const schema = Joi.object().keys({
  userName: Joi.string().required(),
});
exports.validator = validator.body(schema);

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
    return res.fail("Not Available");
  }
};
