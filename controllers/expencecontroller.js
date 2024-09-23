const Expense = require("../models/expensemodel");
// const client = require("../postgresdb");
// const queries = require("../queries");

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findAll();
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const getExpensebyid = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const createExpense = async (req, res) => {
  try {
    console.log(req.body, "dfjhdskfjdshk");
    const expense = await Expense.create(req.body);
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ message: e.message });
  }
};

const updateeExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.update(req.body, { where: { id } });
    if (expense === 0) {
      return res.status(404).json({ message: "expense not found" });
    }
    const updateexpense = await Expense.findByPk(id);
    res.status(200).json({
      status: "success",
      data: updateexpense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.destroy(id);
    if (!expense) {
      return res.status(404).json({ message: "expense not found" });
    }
    res.status(200).json({ message: "expense deleted successfully" });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};
module.exports = {
  getExpense,
  getExpensebyid,
  createExpense,
  updateeExpense,
  deleteExpense,
};
