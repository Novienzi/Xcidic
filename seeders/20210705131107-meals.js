'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('meals', [{
      id: '8174abc9-49d3-4f02-a35c-544be19f5b31',
      name: 'Buffet A'
    },
    {
      id: '846bc366-fc1e-41e2-90f4-23a89bd195e8',
      name: 'Buffet B'
    },
    {
      id: '62451a94-1138-4cbb-b54d-fce4e94c2004',
      name: 'Buffet C'
    }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('meals', {});
  }
};
