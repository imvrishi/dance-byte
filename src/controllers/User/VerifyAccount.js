  const Joi = require("@hapi/joi");
  const validator = require("express-joi-validation").createValidator({
    passError: true,
  });

  const User = require("../../models/User");
  const schema = require("../../util/validator");

  const joiSchema   = { ...schema };
  joiSchema.userId  = Joi.string().required();
  
  exports.validator = validator.body(Joi.object().keys(joiSchema));

  exports.handler = async (req, res, nex) => {
    const userId  = req.body.userId;
    const fieldsToSelect ="tokens.loginType";

    try {  
      const user = await User.findById(userId).select(fieldsToSelect);

      if(user.tokens.loginType == "mobile"){          
          res.success("account verify successfully");
      }else{
          res.fail("account type" + user.tokens.loginType);
      }

    } catch (error) {
      return res.exception("Invalid Parameters", error);
    }
  };
