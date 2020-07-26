const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const User = require("../../models/User");
const schema = require("../../util/validator");
const common = require("../../config/common");

const joiSchema = { ...schema };
joiSchema.userId = Joi.string().required();
joiSchema.userName = Joi.string().required();
joiSchema.mobile = Joi.string();
joiSchema.firstName = Joi.string();
joiSchema.lastName = Joi.string();
joiSchema.fullName = Joi.string();
joiSchema.bio = Joi.string();
joiSchema.profilePicture = Joi.any();
joiSchema.email = Joi.string();
joiSchema.accountType = Joi.string();
joiSchema.interests = Joi.array();
joiSchema.interestedLanguages = Joi.array();

exports.validator = validator.body(Joi.object().keys(joiSchema));

exports.handler = async (req, res, next) => {
  try {
    const data = req.body;
    //logic to upload profile image of user
    if (data.hasOwnProperty("profilePicture")) {
      let isFileValidated = true;
      let validationMessage = "Profile image ";
      let pipe = "";
      if (
        !common.SUPPORTED_IMAGE_FILE_MIME.indexOf(data.profilePicture.type) ==
        -1
      ) {
        isFileValidated = false;
        validationMessage += "should be an image";
        pipe = " and ";
      }

      if (common.MAX_IMAGE_FILE_SIZE < data.profilePicture.size) {
        isFileValidated = false;
        validationMessage +=
          pipe +
          "size should not be greater than " +
          common.MAX_IMAGE_FILE_SIZE / (1024 * 1024) +
          " MB.";
      }

      if (!isFileValidated) {
        return res.fail(validationMessage);
      }

      const uploadPath = path.join(
        common.UPLOAD_PATH,
        data.userName,
        "profile/"
      );

      if (fs.existsSync(path)) {
        fs.mkdirSync(uploadPath);
      }
      const options = {
        // encoding: "utf-8",
        uploadDir: uploadPath,
        multiples: false,
        maxFileSize: common.MAX_IMAGE_FILE_SIZE,
      };
      const form = new formidable.IncomingForm();
      form.parse(req);
      form.on("fileBegin", function (name, file) {
        file.path = uploadPath + file.name;
      });
      form.on("file", function (name, file) {
        console.log("Uploaded " + file.name);
        data.profilePicture = "upload/" + userName + "/profile/" + file.name;
      });
    }

    // Logic to update profile
    const updatedUserProfile = await User.findByIdAndUpdate(userId, data);

    if (updatedUserProfile) {
      res.success("Your profile updated successfully.", {
        updatedUserProfile,
      });
    } else {
      res.fail("Error occurred while updating your profile.");
    }
  } catch (error) {
    res.exception("Error occurred while updating your profile.", error);
  }
};
