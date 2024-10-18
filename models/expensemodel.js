const { DataTypes } = require("sequelize");
const sequelize = require("../postgresdb");
const usermodeldata = require("./user");

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
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},
 {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  // Define relationships
usermodeldata.hasMany(Expense, { foreignKey: "user_id" });
Expense.belongsTo(usermodeldata, { foreignKey: 'user_id' });

  Expense.sync();


module.exports = Expense;
