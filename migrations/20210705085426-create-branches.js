'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('branches', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.FLOAT(10, 6),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.FLOAT(10, 6),
        allowNull: false,
      },
      openingHours: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('branches');
  }
};