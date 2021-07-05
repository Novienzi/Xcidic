'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedules', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      branchId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "branches",
          key: "id"
        }
      },
      mealId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "meals",
          key: "id"
        }
      },
      maxCapacity: {
        type: Sequelize.INTEGER(100),
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER(100),
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedules');
  }
};