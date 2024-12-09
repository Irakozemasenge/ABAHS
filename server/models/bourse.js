'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.bourse.hasMany(models.beligibre, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
      models.bourse.hasMany(models.bpostule, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
      models.bourse.hasMany(models.bavantage, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
    }
  }
  bourse.init({
    titre: DataTypes.TEXT,
    pays: DataTypes.STRING,
    drapeux: DataTypes.STRING,
    domaine: DataTypes.STRING,
    niveau: DataTypes.STRING,
    fin: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bourse',
  });
  return bourse;
};