"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.HistoryVisiting);
    }
  }
  User.init(
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      statusVaccine: {
        type: Sequelize.ENUM(
          "No Vaccine",
          "Vaccine 1",
          "Vaccine 2",
          "Vaccine 3"
        ),
      },
      statusCovid: {
        type: Sequelize.ENUM("Possitive", "Negative"),
      },
      role: {
        type: Sequelize.ENUM("admin", "citizen"),
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
