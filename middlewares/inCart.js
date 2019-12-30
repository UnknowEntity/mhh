var usermodel = require("../models/user.model");

module.exports = (req, res, next) => {
  if (req.user !== false && req.user !== undefined) {
    usermodel.isInCart(req.user.id, req.params.id).then(cartData => {
      if (cartData.length === 1) {
        req["product"] = true;
      } else {
        req["product"] = false;
      }
      console.log(cartData);
      next();
      return;
    });
  } else {
    req["cart"] = false;
    next();
  }
};
