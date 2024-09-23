require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors package
const port = process.env.APP_PORT || 4000;
const expenseroute = require("./routes/expenseroutes.js");
const userroute = require("./routes/user.js");
const sequelize = require("./postgresdb");
const usermodeldata = require("./models/user.js");
const Login = require("./routes/login.js");
const verifyToken = require("./middleware/tokenauth.js");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.log("log 100");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to PostgreSQL has been established successfully.");
    return usermodeldata.sync(); // This will create the table if it doesn't exist
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
app.use("/api/", Login);
app.use("/api/expense", verifyToken, expenseroute);
app.use("/api/user", verifyToken, userroute);
