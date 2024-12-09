'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class etude extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.etude.hasMany(models.seligibre, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
      models.etude.hasMany(models.spostule, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
      models.etude.hasMany(models.savantage, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
    }
  }
  etude.init({
    titre: DataTypes.TEXT,
    pays: DataTypes.STRING,
    drapeux: DataTypes.STRING,
    domaine: DataTypes.STRING,
    niveau: DataTypes.STRING,
    fin: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'etude',
  });
  return etude;
};