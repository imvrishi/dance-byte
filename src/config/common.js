const process = require("process");
require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  PER_PAGE_LIMIT: process.env.PER_PAGE_LIMIT || 20,
  PER_PAGE_OFFSET: process.env.PER_PAGE_OFFSET || 0,
  MAX_OTP_ATTEMPT: process.env.MAX_OTP_ATTEMPT || 3,
  MAX_OTP_RESEND: process.env.MAX_OTP_RESEND || 3,
  MAX_LIMIT: process.env.MAX_LIMIT || 100,
};
