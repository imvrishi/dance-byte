const User = require("../models/User");
const { common } = require("../config");
const response = require("../util/response");

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
  try {
    const param = { userName: userName };
    const user = await User.findOne(param);
    if (user === null) {
      return res.success("Available");
    }
    return res.fail("Not Available");
  } catch (error) {
    return res.fail("Not Available");
  }
};
