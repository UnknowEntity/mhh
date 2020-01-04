var express = require("express");
var router = express.Router();
var isAmin = require("../middlewares/isAmin");
var userModel = require("../models/user.model");

/* GET home page. */
router.get("/users", isAmin, function(req, res, next) {
  userModel.allExceptAdmin().then(usersData => {
    res.render("admin/user", {
      layout: "admin_layout",
      title: "Admin View",
      isLogin: req.user,
      usersData: usersData,
      extra: "<link rel='stylesheet' href='/stylesheets/style.css' />"
    });
  });
});

router.get("/users/:id", isAmin, function(req, res, next) {
  let id = req.params.id;
  userModel.singleById(id).then(userData => {
    res.render("admin/user_info", {
      layout: "admin_layout",
      title: "User Info",
      isLogin: req.user,
      userData: userData[0],
      extra: "<link rel='stylesheet' href='/stylesheets/style.css' />"
    });
  });
});

router.post("/users/:id", isAmin, function(req, res, next) {
  let id = req.params.id;
  userModel.singleById(id).then(userData => {
    let status = !userData[0].status;
    let user = { id, status };
    userModel.update(user).then(n => {
      res.status(200).send({ message: "ok" });
    });
  });
});

module.exports = router;
