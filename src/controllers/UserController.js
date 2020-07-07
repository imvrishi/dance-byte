const User = require("../models/User");
const { common } = require("../config");

exports.registerUser = async (req, res, next) => {
  const data = {
    userName: "rishi",
    mobile: {
      countryCode: "+91",
      mobile: "1234567890",
    },
    otp: "1212",
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

  try {
    user = new User(data);
    console.log(await user.save());
  } catch (error) {
    console.log(error);
  }
};
