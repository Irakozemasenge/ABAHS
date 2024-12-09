'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partenaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  partenaire.init({
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    siteweb: DataTypes.STRING,
    logo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'partenaire',
  });
  return partenaire;
};