const process = require("process");
require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  PER_PAGE_LIMIT: parseInt(process.env.PER_PAGE_LIMIT) || 20,
  PER_PAGE_OFFSET: parseInt(process.env.PER_PAGE_OFFSET) || 0,
  MAX_OTP_ATTEMPT: parseInt(process.env.MAX_OTP_ATTEMPT) || 3,
  MAX_OTP_RESEND: parseInt(process.env.MAX_OTP_RESEND) || 3,
  MAX_LIMIT: parseInt(process.env.MAX_LIMIT) || 100,
  UPLOAD_PATH: process.env.UPLOAD_PATH || "public/upload/",
  MAX_IMAGE_FILE_SIZE:
    parseInt(process.env.MAX_IMAGE_FILE_SIZE) || 5 * 1024 * 1024, // 5 MB
  SUPPORTED_IMAGE_FILE_MIME: process.env.SUPPORTED_IMAGE_FILE_MIME.split(
    " "
  ) || ["image/jpeg", "image/png"], // We won't support gif file
  MAX_VIDEO_FILE_SIZE:
    parseInt(process.env.MAX_VIDEO_FILE_SIZE) || 50 * 1024 * 1024, // 50 MB
  MAX_VIDEO_FILE_DURATION: parseInt(process.env.MAX_VIDEO_FILE_DURATION) || 30, // 30 seconds
  SUPPORTED_VIDEO_FILE_MIME: process.env.SUPPORTED_VIDEO_FILE_MIME.split(
    " "
  ) || ["video/mp4"],
};
