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
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

usermodeldata.sync();

module.exports = usermodeldata;
