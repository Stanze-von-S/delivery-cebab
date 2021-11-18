const express = require('express');
const { Op } = require('sequelize');
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

  const equalUser = await User.findOne({
    where: {
      [Op.or]: [
        { email },
        { username },
        { phone },
      ],
    },
  });

  if (!equalUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      email,
      phone,
      role,
    });
    res.status(200).json({ message: 'User created successfully' });
  } else {
    // res.render('registration', {
    //   error: true,
    // });
    res.json({ message: 'error' });
  }
});

module.exports = router;
