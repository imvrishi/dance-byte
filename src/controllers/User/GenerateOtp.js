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
    if(user.otp.length+1 <=3){
      const userFollowing=await User.update({_id: userId}, {$push:{otp: new_otp }});
        if (userFollowing) {      
          res.success("your otp", new_otp);
        } else {
          res.fail("otp not send");
        }
    }else{
      res.fail("only try 3 time");
    }
    

  } catch (error) {
    res.fail("Invalied Request");
  }
};
