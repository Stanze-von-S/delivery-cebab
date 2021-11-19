const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ Category, User }) {
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(User, { as: 'thisCustomer', foreignKey: 'customerId' });
    }
  }
  Product.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgPath: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
