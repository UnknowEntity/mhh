var express = require("express");
var router = express.Router();
var isLogin = require("../middlewares/getCart");
var isOwned = require("../middlewares/inCart");
var productModel = require("../models/product.model");
var userModel = require("../models/user.model");
var cartModel = require("../models/cart.model");

/* GET home page. */
router.get("/:id", isLogin, isOwned, function(req, res, next) {
  let id = req.params.id;
  productModel.getProductInfo(id).then(productData => {
    let product = productData[0];
    res.render("product/info", {
      title: product.name,
      data: product,
      isLogin: req.user,
      isOwned: req.product,
      extra: "<link rel='stylesheet' href='/stylesheets/product_info.css' />",
      script: '<script src="/javascripts/script_product.js"></script>'
    });
  });
});

router.post("/:id", function(req, res, next) {
  if (req.user !== false && req.user !== undefined) {
    let idUser = req.user.id;
    let idProduct = req.params.id;
    cartModel.getCurrentCartID(idUser).then(id => {
      let idCart = id[0].id;
      let product = { product_id: idProduct, cart_id: idCart, quanlity: 1 };
      console.log(product);
      cartModel.addProductToCart(product).then(n => {
        res.status(200).json({ message: "add ok" });
      });
    });
  } else {
    res.redirect("/users/login");
  }
});

module.exports = router;
