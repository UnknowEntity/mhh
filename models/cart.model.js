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

  delete: function(id) {
    return db.delete("cart", "id", id);
  },

  deleteCartProduct: function(id) {
    return db.delete("cart_product", "product_id", id);
  },

  addProductToCart: product => {
    return db.insert("cart_product", product);
  },
  getCurrentCart: function(id) {
    var sql = `SELECT P.*, CP.quanlity AS quanlity_bought
      FROM cart C, cart_product CP, product P 
      WHERE C.user_id=${id} 
      AND CP.cart_id=C.id 
      AND C.status=1
      AND CP.product_id=P.id`;
    return db.load(sql);
  },
  getCart: function(id) {
    var sql = `SELECT CP.*
      FROM cart C, cart_product CP
      WHERE C.user_id=${id} 
      AND CP.cart_id=C.id
      AND C.status=1`;
    return db.load(sql);
  },
  getCurrentCartID: id => {
    var sql = `SELECT id FROM cart WHERE user_id = ${id} AND status=1`;
    return db.load(sql);
  },
  isInCart: (userId, productId) => {
    var sql = `SELECT CP.product_id 
    FROM cart C, cart_product CP
    WHERE C.user_id=${userId}
    AND C.status=1
    AND C.id=CP.cart_id
    AND CP.product_id=${productId}`;
    return db.load(sql);
  },
  bulkUpdateCart: sql => {
    return db.bulkUpdate(sql);
  }
};

module.exports = cartModel;
