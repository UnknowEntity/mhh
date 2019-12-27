//var usermodel = require("../models/user.model");

module.exports = (req, res, next) => {
  console.log(req.user);
  if (req.user !== false && req.user !== undefined) {
    req["cart"] = `got cart ${req.user}`;
    next();
  }
  req["cart"] = false;
  next();
};
