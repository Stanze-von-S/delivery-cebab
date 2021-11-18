const router = require('express').Router();
const { Product } = require('../../db/models');

router
  .route('/delete/:productId')
  .delete(async (req, res) => {
    await Product.destroy({ where: { id: req.params.productId } });
    res.json();
  });

module.exports = router;
