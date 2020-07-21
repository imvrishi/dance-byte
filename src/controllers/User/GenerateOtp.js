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

      const otpStatus = await User.update({_id: userId}, {$push:{otp: new_otp }});
        if (otpStatus){      
          res.success("OTP send successfully", new_otp);
        } else {
          res.fail("OTP not send");
        }  

  } catch (error) {
    return res.exception("Invalid Parameters", error);
  }
};
