var express = require("express");
var router = express.Router();
var usermodel = require("../models/user.model");
var productModel = require("../models/product.model");
var cartModel = require("../models/cart.model");
var receiptModel = require("../models/receipt.model");
var passport = require("passport");
var bcrypt = require("bcrypt");
var auth = require("../middlewares/auth_user");
var getCart = require("../middlewares/getCart");
var moment = require("moment");

router.get("/register", (req, res, next) => {
  res.render("user/register", {
    layout: "blank_layout",
    title: "Register",
    extra: "<link rel='stylesheet' href='/stylesheets/logform.css' />"
  });
});

router.post("/cart/remove", (req, res, next) => {
  cartModel.deleteCartProduct(req.body.id).then(n => {
    res.status(200).json({ message: "success" });
  });
});

router.get("/:id/add/", auth, (req, res, next) => {
  res.render("user/add_product", {
    layout: "layout",
    title: "Add product",
    extra: "<link rel='stylesheet' href='/stylesheets/logform.css' />",
    isLogin: req.user
  });
});

router.post("/:id/add/", (req, res, next) => {
  req.body["user_id"] = req.user.id;
  var body = req.body;
  productModel.add(body).then(n => {
    res.redirect("/");
  });
});

router.post("/register", (req, res, next) => {
  var saltRounds = 10;
  hash = bcrypt.hashSync(req.body.password, saltRounds);
  var entity = {
    username: req.body.username,
    password: hash,
    email: req.body.email
  };
  usermodel
    .add(entity)
    .then(n => {
      cartModel.add({ user_id: n.insertId }).then(n => {
        res.redirect("/users/login");
      });
    })
    .catch(next);
});

router.get("/login", (req, res, next) => {
  res.render("user/login", {
    layout: "blank_layout",
    title: "Login",
    extra: "<link rel='stylesheet' href='/stylesheets/logform.css' />"
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      console.log(info);
      return res.render("user/login", {
        layout: "blank_layout",
        title: "Login",
        extra: "<link rel='stylesheet' href='/stylesheets/logform.css' />",
        Err_Mess: info.message
      });
    }

    req.logIn(user, err => {
      if (err) return next(err);
      console.log(user);
      return res.redirect("/");
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logOut();
  res.redirect("/users/login");
});

router.get("/:id/profiler", auth, (req, res, next) => {
  var id = req.params.id;
  usermodel
    .singleById(id)
    .then(data => {
      res.render("user/profile", {
        title: "Account",
        userData: data[0],
        isLogin: req.user
      });
    })
    .catch(err => console.log(err));
});

router.post("/:id/profiler", auth, (req, res, next) => {
  var id = req.params.id;
  var user = req.body;
  user["id"] = id;
  usermodel
    .update(user)
    .then(data => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
});

router.post("/:id/chgpwd", (req, res, next) => {
  var id = req.params.id;
  console.log(id);
  usermodel
    .singleById(id)
    .then(data => {
      console.log(data);
      var user = data[0];
      console.log(user);
      user.Password = req.body.newpwd;
      console.log(user.Password);
      usermodel
        .update(user)
        .then(result => {
          console.log(result);
          res.json({
            success: true
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post("/:id/chgbio", (req, res, next) => {
  var id = req.params.id;
  usermodel
    .singleById(id)
    .then(data => {
      var user = data[0];
      console.log(user);
      user.Bio = req.body.bio;
      console.log(user);
      usermodel
        .update(user)
        .then(result => {
          console.log(result);
          res.json({
            success: true
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.get("/is-available", (req, res, next) => {
  var user = req.query.username;
  usermodel.singleByUserName(user).then(rows => {
    if (rows.length > 0) {
      return res.json(false);
    }
    return res.json(true);
  });
});

router.get("/:id/cart", auth, getCart, (req, res, next) => {
  res.render("user/cart", {
    layout: "layout",
    title: "Cart",
    cartData: req.cart,
    isLogin: req.user
  });
});

router.post("/:id/cart", auth, (req, res, next) => {
  let userId = req.params.id;
  let changeQuanlity = req.body;
  cartModel.getCart(userId).then(cartData => {
    let updateString = "";
    let idString = "";
    for (let index = 0; index < cartData.length; index++) {
      if (index !== 0) {
        idString += ",";
      }
      updateString = `${updateString} WHEN ${cartData[index].id} THEN ${
        changeQuanlity[`${cartData[index].product_id}`]
      }`;
      idString = `${idString} ${cartData[index].id}`;
    }
    let sql = `UPDATE cart_product SET quanlity = (CASE id ${updateString} END) WHERE id IN(${idString});`;
    cartModel.bulkUpdateCart(sql).then(n => {
      res.redirect("/");
    });
  });
});

router.post("/:id/checkout", auth, (req, res, next) => {
  let userId = req.params.id;
  let changeQuanlity = req.body;
  cartModel.getCart(userId).then(cartData => {
    let updateString = "";
    let idString = "";
    for (let index = 0; index < cartData.length; index++) {
      if (index !== 0) {
        idString += ",";
      }
      updateString = `${updateString} WHEN ${cartData[index].id} THEN ${
        changeQuanlity[`${cartData[index].product_id}`]
      }`;
      idString = `${idString} ${cartData[index].id}`;
    }
    let sql = `UPDATE cart_product SET quanlity = (CASE id ${updateString} END) WHERE id IN(${idString});`;
    cartModel.bulkUpdateCart(sql).then(n => {
      res.redirect(`/users/${req.user.id}/confrim_checkout`);
    });
  });
});

router.get("/:id/confrim_checkout", auth, getCart, (req, res, next) => {
  let total = 0;
  let poFee = 0;
  let websiteFee = 0;
  let tptFee = 0;
  let finalPrice = 0;
  let cart = req.cart;
  for (let index = 0; index < cart.length; index++) {
    total += cart[index].price * cart[index].quanlity_bought;
  }
  poFee = total * 0.04;
  websiteFee = total * 0.1;
  tptFee = total * 0.05;
  finalPrice = total + poFee + websiteFee + tptFee;
  console.log(req.user);
  res.render("user/checkout", {
    layout: "layout",
    title: "Confrim Checkout",
    cartData: cart,
    isLogin: req.user,
    total: Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(total),
    poFee: Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(poFee),
    websiteFee: Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(websiteFee),
    tptFee: Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(tptFee),
    finalPrice: Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(finalPrice)
  });
});

router.post("/:id/confrim_checkout", auth, (req, res, next) => {
  let userId = req.params.id;
  cartModel.getCurrentCart(userId).then(cartData => {
    let updateString = "";
    let idString = "";
    let total = 0;
    for (let index = 0; index < cartData.length; index++) {
      if (index !== 0) {
        idString += ",";
      }
      let newQuanlity =
        parseInt(cartData[index].quanlity) -
        parseInt(cartData[index].quanlity_bought);
      total += cartData[index].price * cartData[index].quanlity_bought;
      updateString = `${updateString} WHEN ${cartData[index].id} THEN ${newQuanlity}`;
      idString = `${idString} ${cartData[index].id}`;
    }
    let sql = `UPDATE product SET quanlity = (CASE id ${updateString} END) WHERE id IN(${idString});`;
    for (let index = 0; index < cartData.length; index++) {}
    total = total + total * 0.04 + total * 0.1 + total * 0.05;
    let buy_date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    let user_id = userId;
    let dia_chi = req.body.dia_chi;
    let atm = req.body.atm;
    let sdt = req.body.sdt;
    Promise.all([
      productModel.bulkUpdateProduct(sql),
      receiptModel.add({
        total,
        buy_date,
        user_id,
        dia_chi,
        atm,
        sdt
      }),
      cartModel.getCart(userId),
      cartModel.getCurrentCartID(userId)
    ]).then(([n, insertResult, cartProductArray, currentCart]) => {
      let receipt_product = [];
      let insertId = insertResult.insertId;
      for (let index = 0; index < cartProductArray.length; index++) {
        let tempArray = [];
        tempArray.push(cartProductArray[index].product_id);
        tempArray.push(insertId);
        tempArray.push(cartProductArray[index].quanlity);
        receipt_product.push(tempArray);
      }
      let changeCart = currentCart[0];
      changeCart.status = 0;
      Promise.all([
        cartModel.update(changeCart),
        cartModel.add({ user_id: userId }),
        receiptModel.addMutiple(receipt_product)
      ]).then(([changeResult, insertRes, addMulRes]) => {
        res.redirect(`/`);
      });
    });
  });
});

router.get("/:id/receipt", auth, (req, res, next) => {
  let id = req.params.id;
  receiptModel.getUserReceiptList(id).then(receiptData => {
    res.render("user/receipt_list", {
      layout: "layout",
      title: "Receipt List",
      receiptData: receiptData,
      isLogin: req.user
    });
  });
});

router.get("/:id/product_owned", auth, (req, res, next) => {
  let id = req.params.id;
  productModel.getUserOwnedProduct(id).then(ownedProduct => {
    res.render("user/owned_product_list", {
      layout: "layout",
      title: "Bought Product List",
      ownedProduct,
      isLogin: req.user
    });
  });
});

router.post("/receipt/remove", (req, res, next) => {
  let id = req.body.id;
  receiptModel.singleById(id).then(receiptData => {
    let receipt = receiptData[0];
    let dateCurr = moment(Date.now());
    let buy_date = moment(receipt.buy_date);
    let hours = dateCurr.diff(buy_date, "hour");
    if (hours > 24) {
      res.status(200).json({ isDue: true });
    } else {
      receiptModel.deleteProductWithReceiptID(id).then(n => {
        receiptModel.delete("id", id).then(n => {
          res.status(200).json({ isDue: false });
        });
      });
    }
  });
});

router.get("/:id/post_product", auth, (req, res, next) => {
  let id = req.params.id;
  productModel.allByUser(id).then(productData => {
    res.render("user/post_product_list", {
      layout: "layout",
      title: "Post Product List",
      productData,
      isLogin: req.user
    });
  });
});

router.post("/product/remove", (req, res, next) => {
  let id = req.body.id;
  productModel.isProductBought(id).then(productData => {
    console.log(productData);
    let isBought = productData.length > 0 ? true : false;
    if (isBought) {
      res.status(200).json({ isBought });
    } else {
      productModel.delete(id).then(n => {
        res.status(200).json({ isBought });
      });
    }
  });
});

module.exports = router;
