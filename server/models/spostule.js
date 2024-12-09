'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spostule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spostule.belongsTo(models.etude, {
        foreignKey: 'etudeId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  spostule.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    tel: DataTypes.STRING,
    adresse: DataTypes.TEXT,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    etudeId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'spostule',
  });
  return spostule;
};