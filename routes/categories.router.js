const router = require('express').Router();
const { Op } = require('sequelize');
const { Product } = require('../db/models');

router.route('/:categoryId')
  .post(async (req, res) => {
    const { categoryId } = req.params;

    let customer = false;

    if (req.session.user) {
      customer = req.session.user.role === 'customer';
    }
    // categoryId
    const productsRaw = await Product.findAll({
      where: {
        [Op.and]: [
          { categoryId },
          { customerId: null },
        ],
      },
    });

    const productsCopy = [...productsRaw];
    const products = [];

    productsCopy.forEach((product) => {
      const obj = {};
      obj.id = product.id;
      obj.title = product.title;
      obj.price = product.price;
      obj.discount = product.discount;
      obj.discountPrice = (product.price * (100 - product.discount)) / 100;

      products.push(obj);
    });

    res.render('categories', {
      layout: false,
      products,
      customer,
    });
  });

module.exports = router;
