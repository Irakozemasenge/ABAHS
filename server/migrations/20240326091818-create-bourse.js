'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      pays: {
        allowNull: false,
        type: Sequelize.STRING
      },
      drapeux: {
        allowNull: false,
        type: Sequelize.STRING
      },
      domaine: {
        allowNull: false,
        type: Sequelize.STRING
      },
      niveau: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bourses');
  }
};