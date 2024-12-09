'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vpostule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vpostule.belongsTo(models.visa, {
        foreignKey: 'visaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  vpostule.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    tel: DataTypes.STRING,
    adresse: DataTypes.TEXT,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    visaId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vpostule',
  });
  return vpostule;
};