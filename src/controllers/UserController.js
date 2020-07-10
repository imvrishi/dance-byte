const User = require("../models/User");

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

  data.devices.push(data.currentDevice);
  return res.success("Registered", data);

  /*try {
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
