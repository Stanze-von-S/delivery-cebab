const router = require('express').Router();
const { Product, Category } = require('../../db/models');

router
  .route('/:courierId')
  .get(async (req, res) => {
    const courier = req.session.user;
    const categories = await Category.findAll({});
    res.render('createAdv', { courier, categories });
  })
  .post(async (req, res) => {
    console.log(req.body);
    await Product.create({
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      userId: req.session.user.id,
      categoryId: req.body.categoryName,
    });

    res.redirect('/');
  });

module.exports = router;
