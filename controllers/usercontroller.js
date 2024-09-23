const usermodeldata = require("../models/user");
const sequelize = require("../postgresdb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  try {
    const expense = await usermodeldata.findAll();
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const getUserbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await usermodeldata.findByPk(id);
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const createUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    const existingUser = await usermodeldata.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await usermodeldata.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
    });
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (e) {
    console.error("Error creating user:", e);
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateeUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const { id } = req.params;
    const hashedpassword = await bcrypt.hash(password, 10);

    const expense = await usermodeldata.update(
      { firstname, lastname, email, password: hashedpassword },
      {
        where: { id },
      }
    );
    if (expense === 0) {
      return res.status(404).json({ message: "expense not found" });
    }
    const updateexpense = await usermodeldata.findByPk(id);
    res.status(200).json({
      status: "success",
      data: updateexpense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await usermodeldata.destroy(id);
    if (!expense) {
      return res.status(404).json({ message: "expense not found" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};
module.exports = {
  getUser,
  getUserbyid,
  createUser,
  updateeUser,
  deleteUser,
};
