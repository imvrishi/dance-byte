const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const User = require("../../models/User");
const schema = require("../../util/validator");

const joiSchema = { ...schema };
joiSchema.userId = Joi.string().required();

exports.validator = validator.body(Joi.object().keys(joiSchema));

exports.handler = async (req, res, nex) => {    
    const  userId    = req.body.userId; 
    const  new_otp   = Math.floor(100000 + Math.random() * 900000);
  try {   
    const user = await User.findById(userId);
    //if(user.otp.length+1 <= MAX_OTP_RESEND ){
      const otpStatus=await User.update({_id: userId}, {$push:{otp: new_otp }});
        if (otpStatus){      
          res.success("OTP send successfully", new_otp);
        } else {
          res.fail("OTP not send");
        }
   // }else{
    //  res.fail("You have reached maximum limit of resend " + MAX_OTP_RESEND + " OTP");
    //}    
  } catch (error) {
    return res.exception("Something went wrong", error);
  }
};
