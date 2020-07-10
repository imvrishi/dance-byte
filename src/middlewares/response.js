module.exports = function (req, res, next) {
  res.success = function (message, data = {}) {
    res.json({
      status: true,
      message: message,
      data: data,
    });
  };

  res.fail = function (message, data = {}) {
    res.json({
      status: false,
      message: message,
      data: data,
    });
  };

  next();
};
