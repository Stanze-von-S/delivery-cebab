const fs = require('fs').promises;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const linesData = (await fs.readFile('./public/products/kebabs.txt', 'utf-8'));
    const lines = linesData.split('\n');
    const products = lines.reduce(
      (productList, line, i, lineList) => {
        const isNewProduct = i % 5 === 0; // начало нового продукта
        const isLastLine = i === lines.length - 1;
        const isEmptyLine = line === '';
        // const isLastLine = i === lines.length - 1;
        // const isEmptyLine = line === '';

        if (isLastLine && isEmptyLine) {
          return productList;
        }

        if (!isNewProduct) {
          return productList;
        }

        const newProduct = {
          title: line,
          price: Number(lineList[i + 1]),
          discount: Number(lineList[i + 2]),
          userId: Number(lineList[i + 3]),
          categoryId: Number(lineList[i + 4]),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        return [
          ...productList,
          newProduct,
        ];
      },
      [],
    );

    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
