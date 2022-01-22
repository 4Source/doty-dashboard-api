const { Sequelize } = require("sequelize");

const db = new Sequelize(
    process.env.MYSQL_DB_DATABASE, 
    process.env.MYSQL_DB_USERNAME, 
    process.env.MYSQL_DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.MYSQL_DB_HOST,
    logging: false,
});

module.exports = db;