var db = require("../utils/db.utils");
var receiptModel = {
  all: function() {
    return db.load("select * from receipt;");
  },

  singleById: id => {
    var sql = `SELECT * FROM receipt WHERE id = ${id}`;
    return db.load(sql);
  },

  add: function(receipt) {
    return db.insert("receipt", receipt);
  },

  update: function(receipt) {
    return db.update("receipt", receipt);
  },

  delete: function(receipt) {
    return db.delete("receipt", receipt);
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
