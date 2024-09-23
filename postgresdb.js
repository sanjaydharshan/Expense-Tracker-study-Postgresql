// const { Client } = require("pg");
// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "expensetracker",
//   password: "1392",
// port: 8888,
// });
// client.connect((err) => {
//   if (err) {
//     console.error("Connection error", err.stack);
//   } else {
//     console.log("Connected to the database");
//   }
// });
// module.exports = client;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expensetracker", "postgres", "1392", {
  host: "localhost",
  dialect: "postgres",
  port: 8888,
});

module.exports = sequelize;
