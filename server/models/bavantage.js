'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bavantage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bavantage.belongsTo(models.bourse, {
        foreignKey: 'bourseId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  bavantage.init({
    av: DataTypes.TEXT,
    bourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bavantage',
  });
  return bavantage;
};