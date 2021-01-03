const config = require("config");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: config.get("db_host"),
  user: config.get("db_user"),
  password: config.get("db_password"),
  database: config.get("db"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool.promise();

/*
const pool = mysql.createPool({
  host: config.get("db_host"),
  user: config.get("db_user"),
  password: config.get("db_password"),
  database: config.get("db"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  debug: true,
});
*/
