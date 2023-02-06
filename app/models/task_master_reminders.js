"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task_master_reminders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task_master_reminders.init(
    {
      interval: DataTypes.JSON,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "task_master_reminders",
    }
  );
  return task_master_reminders;
};
