module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Oleg',
        password: '$2b$10$khvj74FZ8tondHKIaM3sFu8QstvTQQVBG7/8i.YlooeSBr/lnBr.i',
        email: 'customer@customer.com',
        phone: '89221112233',
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Keshbek',
        password: '$2b$10$khvj74FZ8tondHKIaM3sFu8QstvTQQVBG7/8i.YlooeSBr/lnBr.i',
        email: 'courier@courier.com',
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
