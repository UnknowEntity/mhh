var mysql = require("mysql");
var createConnection = () => {
  // return mysql.createConnection({
  //     host: 'db4free.net',
  //     port: 3306,
  //     user: 'imperium',
  //     password: 'teamgiaosu',
  //     database: 'imperium',
  // });
  return mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "mhh"
  });
};
module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
      connection.end();
    });
  },

  insert: (tableName, obj) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `INSERT INTO ${tableName} set ?`;
      connection.connect();
      connection.query(sql, obj, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
      connection.end();
    });
  },

  bulkInsert: (tableName, property, obj) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `INSERT INTO ${tableName} ${property} VALUES ?`;
      connection.connect();
      connection.query(sql, [obj], (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
      connection.end();
    });
  },

  update: (tableName, obj) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();

      var id = obj.id;
      delete obj.id;
      console.log(id);
      var sql = `update ${tableName} set ? where id = ?`;

      connection.query(sql, [obj, id], (error, results, fields) => {
        if (error) reject(error);
        resolve(results.changedRows);
      });
      connection.end();
    });
  },

  bulkUpdate: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();

      connection.query(sql, (error, results, fields) => {
        if (error) reject(error);
        resolve(results.changedRows);
      });
      connection.end();
    });
  },

  delete: (tableName, column, id) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();

      var sql = `delete from ${tableName} where ${column} = ?`;
      connection.query(sql, [id], (error, results, fields) => {
        console.log(error);
        if (error) reject(error);
        resolve(results.affectedRows);
      });

      connection.end();
    });
  },

  deleteWithoutPrimary: (tableName, obj) => {
    return new Promise((resolve, reject) => {
      var sql = `delete from ${tableName} where ?`;
      connection.query(sql, obj, (error, results, fields) => {
        if (error) reject(error);
        resolve(results.affectedRows);
      });
      connection.end();
    });
  }
};
