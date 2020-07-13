const process = require("process");
require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  PER_PAGE_LIMIT: process.env.PER_PAGE_LIMIT || 20,
  PER_PAGE_OFFSET: process.env.PER_PAGE_OFFSET || 0,
};
