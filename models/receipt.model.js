var db = require("../utils/db.utils");
var receiptModel = {
  all: function() {
    return db.load("select * from receipt;");
  },

  singleById: id => {
    var sql = `SELECT * FROM receipt WHERE id = ${id}`;
    return db.load(sql);
  },

  getUserReceiptList: id => {
    var sql = `SELECT * FROM receipt WHERE user_id = ${id}`;
    return db.load(sql);
  },

  add: function(receipt) {
    return db.insert("receipt", receipt);
  },

  update: function(receipt) {
    return db.update("receipt", receipt);
  },

  delete: function(col, id) {
    return db.delete("receipt", col, id);
  },

  deleteProductWithReceiptID: id => {
    return db.delete("receipt_product", "receipt_id", id);
  },

  addMutiple: function(object) {
    return db.bulkInsert(
      "receipt_product",
      "(product_id, receipt_id,quanlity)",
      object
    );
  }
};

module.exports = receiptModel;
