var cartModel = require("../models/cart.model");

module.exports = (req, res, next) => {
  if (req.user !== false && req.user !== undefined) {
    if (req.cart !== undefined && req.cart !== false) {
      next();
      return;
    } else {
      cartModel.getCurrentCart(req.user.id).then(cartData => {
        req["cart"] = cartData;
        next();
        return;
      });
    }
  } else {
    req["cart"] = false;
    next();
  }
};
