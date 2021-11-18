const router = require('express').Router();
const { Category } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const categories = await Category.findAll({ raw: true });
    res.render('index', { categories });
  });

module.exports = router;
