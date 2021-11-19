const router = require('express').Router();
const { Product } = require('../../db/models');

router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { user } = req.session;
  await Product.update(
    {
      customerId: user.id,
    },
    {
      where: {
        id: productId,
      },
    },
  );
  res.json({ message: 'OK' });
});

module.exports = router;
