const process = require("process");
require('dotenv').config();

module.exports = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_URI: process.env.DB_URI,
    DB_PORT: process.env.DB_PORT || 27017,
};
