const router = require('express').Router();
const { Category, Product } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const categories = await Category.findAll({ raw: true });
    const coordinates = await Product.findAll({ raw: true });
    res.render('index', { categories, user: req.session.user, coordinates });
  })
  .post(async (req, res) => {
    const coordinates = await Product.findAll({ raw: true });
    res.json({ coordinates });
  });

module.exports = router;
