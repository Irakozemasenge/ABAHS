'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seligibre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      seligibre.belongsTo(models.etude, {
        foreignKey: 'etudeId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  seligibre.init({
    crit: DataTypes.TEXT,
    etudeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'seligibre',
  });
  return seligibre;
};