'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tavantage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tavantage.belongsTo(models.travail, {
        foreignKey: 'travailId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  tavantage.init({
    av: DataTypes.TEXT,
    travailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tavantage',
  });
  return tavantage;
};