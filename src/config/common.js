const process = require("process");
require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  PER_PAGE_LIMIT: process.env.PER_PAGE_LIMIT,
  PER_PAGE_OFFSET: process.env.PER_PAGE_OFFSET,
};
