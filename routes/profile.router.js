const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Product } = require('../db/models');

router
  .route('/') // Нужен req params?
  .get(async (req, res) => {
    if (req.session.user.role === 'courier') {
      const courier = req.session.user;
      const userProducts = await Product.findAll({ where: { userId: req.session.user.id } });
      const orders = await Product.findAll({
        where: {
          [Op.and]: [
            { userId: req.session.user.id },
            {
              customerId: {
                [Op.ne]: null,
              },
            },
          ],
        },
        include: {
          model: User,
          attributes: ['phone', 'username'],
          as: 'thisCustomer',
        },
      });

      res.render('profile', {
        courier, orders, userProducts, user: req.session.user,
      });
    } else {
      const customer = req.session.user;
      res.render('profile', { customer, user: req.session.user });
    }
  });

module.exports = router;
