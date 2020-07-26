const uuid = require("uuid");
// const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const Joi = require("@hapi/joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { promisify } = require("util");

const User = require("../../models/User");
const schema = require("../../util/validator");
const common = require("../../config/common");

const fsExists = promisify(fs.exists);
const fsMkdir = promisify(fs.mkdir);
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

const joiSchema = { ...schema };
joiSchema.userId = Joi.string().required();
joiSchema.userName = Joi.string();
joiSchema.mobile = Joi.string();
joiSchema.firstName = Joi.string();
joiSchema.lastName = Joi.string();
joiSchema.fullName = Joi.string();
joiSchema.bio = Joi.string();
// joiSchema.profilePicture = Joi.any();
joiSchema.email = Joi.string();
joiSchema.accountType = Joi.string();
joiSchema.interests = Joi.array();
joiSchema.interestedLanguages = Joi.array();

exports.validator = validator.body(Joi.object().keys(joiSchema));

exports.handler = async (req, res, next) => {
  try {
    const data = req.body;

    /**
     * Only update profile pic if passed
     */
    if (req.files && req.files.profilePicture) {
      const { profilePicture } = req.files;

      /**
       * Let assume it is valid and try to invalidate it
       */
      let isFileValidated = true;
      let validationMessage = "Profile image ";
      let pipe = "";

      /**
       * Check if mime type is in allowed types
       */
      if (
        common.SUPPORTED_IMAGE_FILE_MIME.indexOf(profilePicture.type) === -1
      ) {
        isFileValidated = false;
        validationMessage += "should be an image";
        pipe = " and ";
      }

      /**
       * Check if image file size is less than max size
       */
      if (common.MAX_IMAGE_FILE_SIZE < profilePicture.size) {
        isFileValidated = false;
        validationMessage +=
          pipe +
          "size should not be greater than " +
          common.MAX_IMAGE_FILE_SIZE / (1024 * 1024) +
          " MB.";
      }

      /**
       * If any validation fails return the response
       */
      if (isFileValidated === false) {
        return res.fail(validationMessage);
      }

      const id = uuid.v4();
      const fileName = id + "." + profilePicture.name.split(".").pop();
      const uploadPath = path.join(common.UPLOAD_PATH, data.userId, "profile");
      const uploadFile = path.join(uploadPath, fileName);

      /**
       * Create directory if not exists
       */
      const exists = await fsExists(uploadPath);
      if (exists === false) {
        await fsMkdir(uploadPath, { recursive: true });
      }

      /**
       * Start file uploading
       */
      const rawData = await fsReadFile(profilePicture.path);
      await fsWriteFile(uploadFile, rawData);
      data.profilePicture = uploadFile;

      /*const options = {
        // encoding: "utf-8",
        uploadDir: uploadPath,
        multiples: false,
        maxFileSize: common.MAX_IMAGE_FILE_SIZE,
      };*/

      // const form = new formidable.IncomingForm();

      // form.on("fileBegin", function (name, file) {
      //   console.log("fileBegin" + file.path);
      //   file.path = uploadPath + file.name;
      // });

      // form.on("file", function (name, file) {
      //   console.log("Uploaded " + file.name);
      //   console.log("Uploaded path " + file.path);
      //   data.profilePicture = "upload/" + userName + "/profile/" + file.name;
      // });

      // form.parse(req);
    }

    /**
     * Update profile
     */
    const updatedUserProfile = await User.findByIdAndUpdate(data.userId, data);

    if (updatedUserProfile) {
      res.success("Profile updated.", { updatedUserProfile });
    } else {
      res.fail("Error occurred while updating your profile.");
    }
  } catch (error) {
    res.exception("Error occurred while updating your profile.", error);
  }
};
