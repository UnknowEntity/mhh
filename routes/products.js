var express = require("express");
var router = express.Router();
var isLogin = require("../middlewares/getCart");
var isOwned = require("../middlewares/inCart");
var productModel = require("../models/product.model");
var userModel = require("../models/user.model");
var reviewModel = require("../models/review.model");
var cartModel = require("../models/cart.model");
var moment = require("moment");

/* GET home page. */
router.get("/:id", isLogin, isOwned, function(req, res, next) {
  let id = req.params.id;
  let userId = req.user === false || req.user === undefined ? 0 : req.user.id;
  Promise.all([
    productModel.getProductInfo(id),
    reviewModel.getAllReviewExcept(id, userId),
    reviewModel.getUserProductReview(id, userId)
  ])

    .then(([productData, otherReview, userReview]) => {
      let product = productData[0];
      res.render("product/info", {
        title: product.name,
        data: product,
        isLogin: req.user,
        isOwned: req.product,
        otherReview: otherReview,
        userReview: userReview[0],
        extra:
          "<link rel='stylesheet' href='/stylesheets/product_info.css' />" +
          "<link rel='stylesheet' href='/stylesheets/rating.css' />",
        script:
          '<script src="/javascripts/script_product.js"></script>' +
          '<script src="/javascripts/rating.js"></script>'
      });
    })
    .catch(next);
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

router.get("/:id/review", (req, res, next) => {
  let id = req.params.id;
  if (req.user === false || req.user === undefined) {
    res.redirect("/users/login");
  }
  productModel.getProductInfo(id).then(productInfo => {
    res.render("product/review", {
      layout: "layout",
      title: "Rview Product",
      data: productInfo[0],
      extra:
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.3.2/jquery.rateyo.min.css">' +
        "<link rel='stylesheet' href='/stylesheets/product_info.css' />",
      isLogin: req.user
    });
  });
});

router.post("/:id/review", (req, res, next) => {
  let id = req.params.id;
  if (req.user === false || req.user === undefined) {
    res.redirect("/users/login");
  }
  let review = req.body;
  review["user_id"] = req.user.id;
  review["date_review"] = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  review["product_id"] = id;
  reviewModel.add(review).then(n => {
    res.status(200).send({ message: "ok" });
  });
});

router.get("/:id/review/update", (req, res, next) => {
  let id = req.params.id;
  if (req.user === false || req.user === undefined) {
    res.redirect("/users/login");
  }
  reviewModel.singleById(id).then(data => {
    let reviewData = data[0];
    productModel.getProductInfo(reviewData.product_id).then(productInfo => {
      res.render("product/update_review", {
        layout: "layout",
        title: "Update Review",
        data: productInfo[0],
        reviewData,
        extra:
          '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.3.2/jquery.rateyo.min.css">' +
          "<link rel='stylesheet' href='/stylesheets/product_info.css' />",
        isLogin: req.user
      });
    });
  });
});

router.post("/:id/review/update", (req, res, next) => {
  if (req.user === false || req.user === undefined) {
    res.redirect("/users/login");
  }
  let review = req.body;
  review["date_review"] = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  reviewModel.update(review).then(n => {
    res.status(200).send({ message: "ok" });
  });
});

module.exports = router;
