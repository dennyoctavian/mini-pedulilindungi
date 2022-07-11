"use strict";
const { Model } = require("sequelize");
const { HistoryVisiting } = import("./historyvisiting");
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Place.hasMany(HistoryVisiting);
    }
  }
  Place.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Place",
    }
  );
  return Place;
};
