"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task_master_tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task_master_tasks.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      when: DataTypes.STRING,
      priority: DataTypes.STRING,
      project_id: DataTypes.STRING,
      reminder_id: DataTypes.STRING,
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
      modelName: "task_master_tasks",
    }
  );
  return task_master_tasks;
};
