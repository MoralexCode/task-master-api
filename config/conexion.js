"use strict";
const Sequelize = require("sequelize");
const ENV = process.env;
// Create a conexion config
let DB_NAME = ENV.DB_NAME;

// if (ENV.NODE_ENV === "test") {
//   DB_NAME = "task_master_test";
// }
const conexion = new Sequelize(DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: ENV.DB_DIALECT,
  port: ENV.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = conexion;
