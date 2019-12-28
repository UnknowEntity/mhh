var usermodel = require("../models/user.model");

module.exports = (req, res, next) => {
  if (req.user !== false && req.user !== undefined) {
    usermodel.getCurrentCart(req.user.id).then(cartData => {
      req["cart"] = cartData;
      next();
      return;
    });
  } else {
    req["cart"] = false;
    next();
  }
};
