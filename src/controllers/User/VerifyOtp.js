  const Joi = require("@hapi/joi");
  const validator = require("express-joi-validation").createValidator({
    passError: true,
  });

  const User = require("../../models/User");
  const common = require("../../config/common");
  const schema = require("../../util/validator");

  const joiSchema   = { ...schema };
  joiSchema.userId  = Joi.string().required();
  joiSchema.otp     = Joi.string().required();
  
  exports.validator = validator.body(Joi.object().keys(joiSchema));

  exports.handler = async (req, res, nex) => {
    const userId  = req.body.userId;
    const otp     = req.body.otp;
    const fieldsToSelect ="otp otpVerifyCount";

    try {  
      const user = await User.findById(userId).select(fieldsToSelect);

      if(user.otp.includes(otp)){
          await user.update({_id: userId}, {$set:{otp: []}, isLoggedIn : true, otpVerifyCount : 0});
          res.success("OTP verified successfully", otp);
      }else{
          /*checking opt max attempt */
        if((user.otpVerifyCount+1) <= parseInt(common.MAX_OTP_ATTEMPT)){
            user.otpVerifyCount = user.otpVerifyCount + +1;
            await user.save();
            res.fail("Please enter valid OTP");
        }else{
          res.fail("You have reached maximum limit of receiving " + common.MAX_OTP_ATTEMPT + " OTP");
        } 
      }

    } catch (error) {
      return res.exception("Invalid Parameters", error);
    }
  };
