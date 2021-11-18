const router = require('express').Router();
const { User, Product } = require('../db/models');

router
  .route('/') // Нужен req params?
  .get(async (req, res) => {
    if (req.session.user.role === 'courier') {
      const courier = req.session.user;
      const userProducts = await Product.findAll({ where: { userId: req.session.user.id } });
      res.render('profile', { courier, userProducts });
    } else {
      const customer = req.session.user;
      res.render('profile', { customer });
    }
  });

module.exports = router;
