  const Joi = require("@hapi/joi");
  const validator = require("express-joi-validation").createValidator({
    passError: true,
  });
  const User = require("../../models/User");

  const schema = Joi.object().keys({
    otp       : Joi.number().required(),
    userId    : Joi.string().required(),
  });

  exports.validator = validator.body(schema);

  exports.handler = async (req, res, nex) => {
    const userId  = req.body.userId;
    const otp     = req.body.otp;

    try {  
      const user = await User.find({"otp" : { $in : [otp]}});

      if ((user.length)>0) {
        await User.update({_id: userId}, {$set:{otp: []}, isLoggedIn : true});
        res.success("otp verified successfully", otp);
      } else {
        res.fail("Enter valid otp");
      }

    } catch (error) {
      return res.fail("Something went wrong", error);
    }
  };
