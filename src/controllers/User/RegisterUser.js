const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const User = require("../../models/User");
const schema = require("../../util/validator");

const joiSchema = { ...schema };
joiSchema.userName = Joi.string().required();
joiSchema.mobile = Joi.string().required();
joiSchema.countryCode = Joi.string().required();
joiSchema.authenticatedToken = Joi.string().required();
joiSchema.accountType = Joi.string().required();
joiSchema.interests = Joi.array().min(1).required();
joiSchema.deviceId = Joi.string().required();
joiSchema.deviceModel = Joi.string().required();
joiSchema.deviceOS = Joi.string().required();
joiSchema.deviceOSVersion = Joi.string().required();
joiSchema.apiVersion = Joi.string().required();
joiSchema.deviceName = Joi.string().required();
joiSchema.latitude = Joi.string();
joiSchema.longitude = Joi.string();
joiSchema.country = Joi.string();
joiSchema.state = Joi.string();
joiSchema.region = Joi.string();

exports.validator = validator.body(Joi.object().keys(joiSchema));

exports.handler = async (req, res, next) => {
  const data = {
    userName: req.body.userName,
    mobile: {
      mobile: req.body.mobile,
      countryCode: req.body.countryCode,
    },
    otp: [Math.floor(100000 + Math.random() * 900000)],
    authenticatedToken: req.body.authenticatedToken,
    accountType: req.body.accountType,
    interests: req.body.interests,
    currentLocation: {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      country: req.body.country,
      state: req.body.state,
      region: req.body.region,
    },
    currentDevice: {
      deviceId: req.body.deviceId,
      deviceModel: req.body.deviceModel,
      deviceOS: req.body.deviceOS,
      deviceOSVersion: req.body.deviceOSVersion,
      apiVersion: req.body.apiVersion,
      deviceName: req.body.deviceName,
    },
    tokens: {
      loginType: "mobile",
    },
    isRegistered: true,
  };

  try {
    user = new User(data);
    const userInsertData = await user.save();

    if (userInsertData) {
      res.success("Your Account created successfully.", {
        userId: userInsertData._id,
        otp: data.otp,
      });
    } else {
      res.fail("Error occured when we are creating your account.");
    }
  } catch (error) {
    res.exception("Error occured when we are creating your account.", error);
  }
};
