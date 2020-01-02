var db = require("../utils/db.utils");

var productModel = {
  all: function() {
    return db.load("select * from product;");
  },

  allByUser: function(id) {
    return db.load(`select * from product WHERE user_id= ${id};`);
  },

  getProductInfo: id => {
    var sql = `SELECT P.*, U.username 
    FROM product P, user U
    WHERE P.user_id=U.id
    AND P.id=${id}`;
    return db.load(sql);
  },

  singleById: id => {
    var sql = `SELECT * FROM product WHERE id = ${id}`;
    return db.load(sql);
  },

  add: function(product) {
    return db.insert("product", product);
  },

  update: function(product) {
    return db.update("product", product);
  },

  delete: function(id) {
    return db.delete("product", "id", id);
  },
  bulkUpdateProduct: sql => {
    return db.bulkUpdate(sql);
  },
  getUserOwnedProduct: id => {
    var sql = `SELECT DISTINCT P.*
    FROM product P, receipt_product RP, receipt R
    WHERE P.id=RP.product_id
    AND R.id=RP.receipt_id
    AND R.user_id=${id}`;
    return db.load(sql);
  },

  addReview: review => {
    return db.insert("review", review);
  },

  isProductBought: id => {
    var sql = `SELECT DISTINCT C.id,R.id
    FROM product P, cart_product CP, cart C, receipt R, receipt_product RP
    WHERE P.id=${id}
    AND 
    ((P.id=CP.product_id AND CP.cart_id=C.id) 
     OR (P.id=RP.product_id AND RP.receipt_id=R.id))`;
    return db.load(sql);
  }
};

module.exports = productModel;
