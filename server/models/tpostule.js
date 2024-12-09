'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tpostule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tpostule.belongsTo(models.travail, {
        foreignKey: 'travailId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  tpostule.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    tel: DataTypes.STRING,
    adresse: DataTypes.TEXT,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    travailId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tpostule',
  });
  return tpostule;
};