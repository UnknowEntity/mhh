var express = require("express");
var router = express.Router();
var isLogin = require("../middlewares/getCart");
var productModel = require("../models/product.model");

/* GET home page. */
router.get("/:id", isLogin, function(req, res, next) {
  let id = req.params.id;
  productModel.getProductInfo(id).then(productData => {
    let product = productData[0];
    res.render("product/info", {
      title: product.name,
      data: product,
      extra: "<link rel='stylesheet' href='/stylesheets/product_info.css' />",
      script: '<script src="/javascripts/script_product.js"></script>'
    });
  });
});

module.exports = router;
