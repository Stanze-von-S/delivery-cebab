module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Oleg',
        password: '123456',
        email: 'oleg@oleg.com',
        phone: '89221112233',
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Keshbek',
        password: '123456',
        email: 'keshbek@keshbek.com',
        phone: '89221234567',
        role: 'courier',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
