'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beligibre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      beligibre.belongsTo(models.bourse, {
        foreignKey: 'bourseId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  beligibre.init({
    crit: DataTypes.TEXT,
    bourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'beligibre',
  });
  return beligibre;
};