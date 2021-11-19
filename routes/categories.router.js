const router = require('express').Router();
const { Product } = require('../db/models');

router.route('/:categoryId')
  .post(async (req, res) => {
    const { categoryId } = req.params;


    let customer = false;

    if (req.session.user) {
      customer = req.session.user.role === 'customer';
    }
    // console.log(customer);

    const products = await Product.findAll({ where: { categoryId }, raw: true });
    res.render('categories', {
      layout: false,
      products,
      customer,
    });
  });

module.exports = router;
