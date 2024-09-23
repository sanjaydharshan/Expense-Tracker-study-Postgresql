const { DataTypes } = require("sequelize");
const sequelize = require("../postgresdb");

const usermodeldata = sequelize.define(
  "usermodeldata",
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    lastname: {
      // Fixed typo from 'ladtname' to 'lastname'
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Options
    timestamps: true, // Enables createdAt and updatedAt
    createdAt: "created_at", // Optional: rename the createdAt field
    updatedAt: "updated_at", // Optional: rename the updatedAt field
  }
);

// Sync the model with the database
usermodeldata.sync();

module.exports = usermodeldata;
