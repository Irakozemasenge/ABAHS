'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class savantage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      savantage.belongsTo(models.etude, {
        foreignKey: 'etudeId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  savantage.init({
    av: DataTypes.TEXT,
    etudeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'savantage',
  });
  return savantage;
};