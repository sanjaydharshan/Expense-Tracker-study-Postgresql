const { DataTypes } = require("sequelize");
const sequelize = require("../postgresdb");

const Expense = sequelize.define("Expense", {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Amount is required",
      },
      isInt: {
        msg: "Amount must be an integer",
      },
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Category is required",
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      notNull: {
        msg: "Date is required",
      },
      isDate: {
        msg: "Date must be valid",
      },
    },
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Payment method is required",
      },
    },
  },
});
Expense.sync();

module.exports = Expense;
