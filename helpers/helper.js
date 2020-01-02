// var hbs = require("express-handlebars");
// Handlebars.registerHelper('DateFormat', function(dateTime) {
//   return moment(dateTime).format('D MMM YYYY @ H:mm');
// });

var exphbs = require("express-handlebars"); // you can use any variable name

var hbs = exphbs.create({
  helpers: {
    DateFormat: function(dateTime) {
        return moment(dateTime).format('D MMM YYYY @ H:mm');
    },
    fooo: function (object) {
        return "Foo" + object;
    }
  }
});