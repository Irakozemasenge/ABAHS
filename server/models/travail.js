'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class travail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.travail.hasMany(models.tpostule, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
      models.travail.hasMany(models.tavantage, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
    }
  }
  travail.init({
    pays: DataTypes.STRING,
    drapeux: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'travail',
  });
  return travail;
};