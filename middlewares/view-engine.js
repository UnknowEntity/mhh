var hbs = require("express-handlebars");

var path = require("path");
var moment = require("moment");

module.exports = function(app) {
  app.engine(
    ".hbs",
    hbs({
      defaultLayout: "layout",
      layoutsDir: "views/_layouts",
      partialsDir: "views/_partials",
      extname: ".hbs",
      helpers: {
        DateFormat: Date => {
          return moment(Date).format("hh:mm A MMM Do, YYYY");
        },
        MoneyFormat: Money => {
          return Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
          }).format(Money);
        },
        Status: (a, ofuser, ismanager) => {
          if (a == 4 && (ofuser || ismanager)) {
            return "bg-danger";
          } else if (a == 2 && (ofuser || ismanager)) {
            return "bg-warning";
          } else if (a == 3) {
            return "bg-success";
          }
        },
        CheckDueDate: Date => {
          if (moment(Date).isValid()) {
            return moment(Date).fromNow();
          }
          return;
        }
      }
    })
  );
  app.set("view engine", "hbs");
};
