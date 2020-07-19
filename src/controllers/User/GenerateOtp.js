const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const User = require("../../models/User");

const schema = Joi.object().keys({
  userId    : Joi.string().required(),
});
exports.validator = validator.body(schema);

exports.handler = async (req, res, nex) => {    
    const  userId    = req.body.userId; 
    const  new_otp   = Math.floor(100000 + Math.random() * 900000);
  try {   
    const user = await User.findById(userId);
    if(user.otp.length+1 <= MAX_OTP_ATTEMPT ){
      const otpStatus=await User.update({_id: userId}, {$push:{otp: new_otp }});
        if (otpStatus){      
          res.success("OTP send successfully", new_otp);
        } else {
          res.fail("OTP not send");
        }
    }else{
      res.fail("You have reached maximum limit of receiving " + MAX_OTP_ATTEMPT + " OTP");
    }    
  } catch (error) {
    return res.fail("Something went wrong", error);
  }
};
