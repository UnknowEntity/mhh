var express = require("express");
var router = express.Router();
var isLogin = require("../middlewares/getCart");
var productModel = require("../models/product.model");

/* GET home page. */
router.get("/", isLogin, function(req, res, next) {
  productModel.all().then(productData => {
    res.render("index", {
      title: "Express",
      isLogin: req.user,
      products: productData,
      extra: "<link rel='stylesheet' href='/stylesheets/homepage.css' />",
    });
  });
});

module.exports = router;
