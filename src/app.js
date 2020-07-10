const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const router = require("./routes");
require("./util/database")();
const middleWares = require("./middlewares");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "..", "public")));

for (const k in middleWares) {
  app.use(middleWares[k]);
}

app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // generate the json error response
  if (err && err.error && err.error.isJoi) {
    res.status(err.status || 400);
    res.fail("Validation Failed", err.error.details);
  } else {
    res.status(err.status || 500);
    res.fail(res.locals);
  }
});

module.exports = app;
