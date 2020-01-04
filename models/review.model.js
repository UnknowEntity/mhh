var db = require("../utils/db.utils");
var reviewModel = {
  all: function() {
    return db.load("select * from review;");
  },

  singleById: id => {
    var sql = `SELECT * FROM review WHERE id = ${id}`;
    return db.load(sql);
  },

  add: function(review) {
    return db.insert("review", review);
  },

  update: function(review) {
    return db.update("review", review);
  },

  delete: function(col, id) {
    return db.delete("review", col, id);
  },
  getAllReviewExcept: (idProduct, idExcept) => {
    var sql = `SELECT R.*,U.username AS name
    FROM review R, user U
    WHERE R.user_id =U.id
    AND R.user_id<>${idExcept}
    AND R.product_id=${idProduct}`;
    return db.load(sql);
  },
  getUserProductReview: (idProduct, idUser) => {
    var sql = `SELECT R.*,U.username AS name
    FROM review R, user U
    WHERE R.user_id =U.id
    AND R.user_id=${idUser}
    AND R.product_id=${idProduct}`;
    return db.load(sql);
  }
};

module.exports = reviewModel;
