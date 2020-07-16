const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const User = require("../../models/User");
const { exist } = require("@hapi/joi");

const schema = Joi.object().keys({
  userId    : Joi.string().required(),
});

exports.validator = validator.body(schema);

exports.handler = async (req, res, nex) => {    
 const  userId    = req.body.userId; 
 const  new_otp   = Math.floor(Math.random() * 1000000);

  try {    
    const userInsertData = User.findByIdAndUpdate(userId,
        {$push: {otp: new_otp}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
              res.fail("otp not send");
            }else{
              res.success("otp send", new_otp);
            }
        }
    );

  } catch (error) {
    res.fail("Invalied Request");
  }
};
