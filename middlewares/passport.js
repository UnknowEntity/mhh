var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var usermodel = require("../models/user.model");
var bcrypt = require("bcrypt");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  var ls = new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      usermodel
        .singleByUserName(username)
        .then(rows => {
          if (rows.length === 0) {
            return done(null, false, { message: "Invalid username" });
          }

          var user = rows[0];
          bcrypt.compare(password, user.password, (err, same) => {
            if (same) {
              return done(null, user);
            } else {
              console.log(err);
              return done(null, false);
            }
          });
        })
        .catch(err => {
          return done(err, false);
        });
    }
  );

  passport.use(ls);
  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};
