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
    const fieldsToSelect ="otp";
    try {  
      const user = await User.find({"otp" : { $in : [req.body.otp]}});

      if ((user.length)>0) {
        await User.update({_id: userId}, {$set:{otp: []}, isLogin : 1});
        res.success("verified", otp);
      } else {
        res.fail("otp not verified");
      }

    } catch (error) {
      res.fail("invalid request");
    }
  };
