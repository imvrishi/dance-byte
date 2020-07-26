const sanitize = require("mongo-sanitize");

module.exports = function (req, res, next) {
  req.body = { ...sanitize(req.fields), ...req.files };
  // req.files = sanitize(req.files);
  req.params = sanitize(req.params);
  req.query = sanitize(req.query);
  next();
};
