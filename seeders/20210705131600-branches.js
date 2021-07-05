'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('branches', [{
      id: '8619a5be-e6e1-48e1-b996-dadcda102579',
      branchName: 'Reataurant A',
      latitude: '-7.713660',
      longitude: '110.407260',
      openingHours: '10.00'
    },
    {
      id: 'c033126a-f8c6-41ad-b4a5-f8df6f3b0a9b',
      branchName: 'Reataurant B',
      latitude: '-7.735160',
      longitude: '110.395350',
      openingHours: '10.00'
    }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('branches', {});
  }
};
