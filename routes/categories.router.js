const router = require('express').Router();
const { Product } = require('../db/models');

router.route('/:categoryId')
  .post(async (req, res) => {
    const { categoryId } = req.params;
    const products = await Product.findAll({ where: { categoryId }, raw: true });
    res.render('categories', {
      layout: false,
      products,
    });
  });

module.exports = router;
