var db = require("../utils/db.utils");

var cartModel = {
  all: function() {
    return db.load("select * from cart;");
  },

  singleById: id => {
    var sql = `SELECT * FROM cart WHERE id = ${id}`;
    return db.load(sql);
  },

  add: function(cart) {
    return db.insert("cart", cart);
  },

  update: function(cart) {
    return db.update("cart", cart);
  },

  delete: function(cart) {
    return db.delete("cart", cart);
  },

  addProductToCart: product => {
    return db.insert("cart_product", product);
  }
};

module.exports = cartModel;
