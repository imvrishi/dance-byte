const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const User = require("../../models/User");

const schema = Joi.object().keys({
  userName            : Joi.string().required(),
  mobile              : Joi.string().required(),
  countryCode         : Joi.string().required(),
  authenticatedToken  : Joi.string().required(),
  accountType         : Joi.string().required(),
  interests           : Joi.array().min(1).required(),    
  deviceId            : Joi.string().required(),
  deviceModel         : Joi.string().required(),
  deviceOS            : Joi.string().required(),
  deviceOSVersion     : Joi.string().required(),
  apiVersion          : Joi.string().required(),
  deviceName          : Joi.string().required(),
  latitude            : Joi.string(),
  longitude           : Joi.string(),
  country             : Joi.string(),
  state               : Joi.string(),
  region              : Joi.string(),
});

exports.validator = validator.body(schema);

exports.handler = async (req, res,next) => {  
  
  const data = {
    userName            :req.body.userName,
    mobile              : { 
      mobile            :req.body.mobile,
      countryCode       :req.body.countryCode,
    },
    otp                 : [Math.floor(100000 + Math.random() * 900000)],
    authenticatedToken  : req.body.authenticatedToken,
    accountType         : req.body.accountType,
    interests           : req.body.interests,   
    currentLocation     : {
            latitude    : req.body.latitude,
            longitude   : req.body.longitude,
            country     : req.body.country,
            state       : req.body.state,
            region      : req.body.region,
    },
    currentDevice : {
        deviceId        : req.body.deviceId,
        deviceModel     : req.body.deviceModel,
        deviceOS        : req.body.deviceOS,
        deviceOSVersion : req.body.deviceOSVersion,
        apiVersion      : req.body.apiVersion,
        deviceName      : req.body.deviceName,
    },
    tokens : {
           loginType   : "mobile"
    },
    isRegistered        : 1,
  };

  try {
    user = new User(data);
    const userInsertData = await user.save();

    if (userInsertData){
      res.success("Your Account created successfully.", { userId : userInsertData._id, otp:data.otp});
    }
    else {
      res.fail("Error occured when we are creating your account.");
    }
  } catch (error) {
    res.fail("Error occured when we are creating your account.");
  }
};
