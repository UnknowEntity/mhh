var cartmodel = require("../models/cart.model");

module.exports = (req, res, next) => {
  if (req.user !== false && req.user !== undefined) {
    cartmodel
      .isInCart(req.user.id, req.params.id)
      .then(cartData => {
        if (cartData.length === 1) {
          req["product"] = true;
        } else {
          req["product"] = false;
        }
        console.log(cartData);
        next();
        return;
      })
      .catch(next);
  } else {
    req["product"] = false;
    next();
    return;
  }
};
