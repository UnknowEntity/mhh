var db = require("../utils/db.utils");
var userModel = {
  all: function() {
    return db.load("select * from user;");
  },
  singleByUserName: userName => {
    return db.load(`select * from user where Username = '${userName}'`);
  },

  singleById: id => {
    var sql = `SELECT * FROM user WHERE Id = ${id}`;
    return db.load(sql);
  },

  email: function(id) {
    var sql = "select `Email` from `user` where `Id` = " + id;
    console.log(sql);
    return db.load(sql);
  },

  add: function(user) {
    return db.insert("user", user);
  },

  update: function(user) {
    return db.update("user", user);
  },

  delete: function(user) {
    return db.delete("user", user);
  },

  // allByProject: function (id) {
  //   var sql = `select Id, Avatar, Fullname, Username, Email, Bio, if(Id in (select user.Id from user, project where user.Id = project.UserId && project.Id=${id}), 1, 0) as Role from(select user.* from user, project where user.Id = project.UserId && project.Id=${id} union select user.* from user, participation where user.Id = participation.UserId && participation.ProjectId=${id}) as a`;

  //   return db.load(sql);
  // },
  getCurrentCart: function(id) {
    var sql = `select Id, Avatar, Fullname, Username, Email, Bio, if(Id in (select user.Id from user, project where user.Id = project.UserId && project.Id=${id}), 1, 0) as Role from(select user.* from user, project where user.Id = project.UserId && project.Id=${id} union select user.* from user, participation where user.Id = participation.UserId && participation.ProjectId=${id}) as a`;

    return db.load(sql);
  }
};

module.exports = userModel;
