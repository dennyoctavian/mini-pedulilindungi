"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistoryVisiting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoryVisiting.belongsTo(models.User);
      HistoryVisiting.belongsTo(models.Place);
    }
  }
  HistoryVisiting.init(
    {
      user_id: DataTypes.INTEGER,
      place_id: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "HistoryVisiting",
    }
  );
  return HistoryVisiting;
};
