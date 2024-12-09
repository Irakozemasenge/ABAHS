'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bpostule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bpostule.belongsTo(models.bourse, {
        foreignKey: 'bourseId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  bpostule.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    tel: DataTypes.STRING,
    adresse: DataTypes.TEXT,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    bourseId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bpostule',
  });
  return bpostule;
};