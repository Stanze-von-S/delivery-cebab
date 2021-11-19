const router = require('express').Router();
const { Product, Category } = require('../../db/models');

router
  .route('/:productId')
  .get(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findOne({ where: { id: productId } });
    const categories = await Category.findAll();

    res.render('editForm', { product, categories });
  })
  .put(async (req, res) => {
    const { productId } = req.params;
    const data = await Product.update(
      {
        title: req.body.title,
        price: req.body.price,
        discount: req.body.discount,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      {
        where: {
          id: productId,
        },
      },
    );
    res.json({ message: 'ok'});
  });

router
  .route('/delete/:productId')
  .delete(async (req, res) => {
    await Product.destroy({ where: { id: req.params.productId } });
    res.json();
  });

module.exports = router;
