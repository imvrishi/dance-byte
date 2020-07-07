const User = require('../models/User');
const { common } = require("../config");

exports.registerUser = (req, res, next) => {
    res.send(common.APP_NAME);
};