const router = require('express').Router();
const { User, Product } = require('../db/models');

router
  .route('/') // Нужен req params?
  .get(async (req, res) => {
    // const currentUser = await User.findOne({ where: { id: req.session.user.id } });
    // const userProducts = await Product.findAll({ where: { userId: req.session.user.id } });

    res.render('profile');
  });

module.exports = router;
