const User = require("../models/User");
const { common } = require("../config");

exports.registerUser = async (req, res, next) => {
  const data = {
    userName: "rishi",
    authenticatedToken: "32bitrandomstring",
    tokens: {
      loginType: "google",
      socialToken: "hex123",
    },
    currentDevice: {
      deviceId: "hex123",
      deviceModel: "MI 5A",
      deviceOS: "Naugat",
      deviceOSVersion: "9",
      apiVersion: "36",
      deviceName: "Xiomi MI",
    },
    devices: [],
  };

  /* data.devices.push(data.currentDevice);

  try {
    user = new User(data);
    console.log(await user.save());
  } catch (error) {
    console.log(error);
  } */
};

exports.postRegisterUser = async (req, res, next) => {
  const requestData = req.body;
  res.json({ message: requestData });
};

exports.postVerifyUserName = async (req, res, next) => {
  const userName = req.body.userName;

  // Validating the post data
  if (typeof userName !== "string" || !userName) {
    return res.json({ error: "userName is required" });
  }

  try {
    const param = { userName: userName };
    User.findOne(param, function (error, user) {
      if (error) {
        console.log(error);
        return res.json({ error: "There is some error with this userName" });
      }
      console.log(user);
      return res.json({ message: user });
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: "There is some error with this userName" });
  }
};
