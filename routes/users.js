var express = require("express");
var router = express.Router();
var usermodel = require("../models/user.model");
var productModel = require("../models/product.model");
var passport = require("passport");
var bcrypt = require("bcrypt");
var auth = require("../middlewares/auth_user");
var getCart = require("../middlewares/getCart");

router.get("/register", (req, res, next) => {
  res.render("user/register", {
    layout: "blank_layout",
    title: "Register",
    extra: "<link rel='stylesheet' href='/stylesheets/logform.css' />"
  });
});

router.get("/:id/add/", auth, (req, res, next) => {
  res.render("user/add_product", {
    layout: "layout",
    title: "Add product",
    extra: "<link rel='stylesheet' href='/stylesheets/logform.css' />"
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
      res.redirect("/users/login");
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

router.post("/logout", auth, (req, res, next) => {
  req.logOut();
  res.redirect("/users/login");
});

router.get("/:id/profiler", auth, (req, res, next) => {
  var id = req.params.id;
  usermodel
    .singleById(id)
    .then(data => {
      res.render("user/profile", {
        UserId: req.user.Id,
        title: "Portfolio",
        data: data[0]
      });
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

module.exports = router;
