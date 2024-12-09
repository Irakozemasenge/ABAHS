'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class visa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.visa.hasMany(models.vpostule, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      });
    }
  }
  visa.init({
    pays: DataTypes.STRING,
    drapeaux: DataTypes.STRING,
    categorie: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'visa',
  });
  return visa;
};