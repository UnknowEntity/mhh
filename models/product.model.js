var db = require("../utils/db.utils");

var productModel = {
  all: function() {
    return db.load("select * from product;");
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

  delete: function(product) {
    return db.delete("product", product);
  }
};

module.exports = productModel;
