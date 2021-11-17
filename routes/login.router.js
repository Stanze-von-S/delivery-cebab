const express = require('express');
// const bcrypt = require('bcrypt')
// const { User } = require('../db/models');

// const logger = console
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

// router.post('/', async (req, res) => {
//   const { login, password, email } = req.body;
//   // const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({
//     username: login,
//     password: password,
//     email,
//   });
//   res.redirect('/login');
// });

router.get('/logout', (req, res) => {
  // req.session.destroy((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.clearCookie(req.app.get('session cookie name'));
  res.redirect('/');
  // });
});
module.exports = router;
