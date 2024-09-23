const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expensetracker", "postgres", "1392", {
  host: "localhost",
  dialect: "postgres",
  port: 8888,
});

module.exports = sequelize;
