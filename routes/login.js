const express = require("express");
const Router = express.Router();
const { LoginUser } = require("../controllers/logincontroller");
Router.post("/login", LoginUser);

module.exports = Router;
