const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

// const logger = console
const router = express.Router();

router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const {
    username,
    password,
    email,
    phone,
    role,
  } = req.body;
  const findEl = await User.findOne({
    where: { email },
  });
  if (!findEl) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      phone,
      role,
    });
    res.redirect('/login');
  } else {
    res.render('registration', {
      error: true,
    });
  }
});

module.exports = router;
