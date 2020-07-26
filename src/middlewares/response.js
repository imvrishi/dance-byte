module.exports = function (req, res, next) {
  res.success = function (message, data = {}) {
    if (req.body) {
      if (req.body.draw) {
        data.draw = req.body.draw;
      }

      if (req.body.limit) {
        data.limit = req.body.limit;
      }

      if (req.body.offset) {
        data.offset = req.body.offset;
      }
    }

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

  res.exception = function (message, error) {
    // Implement the logic of error logging and all
    const data = {
      requestedUrl: req.originalUrl,
      requestData: req.body,
      exceptionOccurred: error,
    };
    console.log(data);
    res.json({
      status: false,
      message: message,
      data: {},
    });
  };

  next();
};
