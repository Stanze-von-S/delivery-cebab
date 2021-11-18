const router = require('express').Router()

router.get('/', (req, res) => {
  // req.session.destroy((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.clearCookie(req.app.get('session cookie name'));
  res.redirect('/');
  // });
});

module.exports = router;
