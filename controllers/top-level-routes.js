const router = require('express').Router();
const sequelize = require('../config/connection');

// DH importing authCheck middleware
const authCheck = require('../utils/authCheck');

router.get('/', authCheck, async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    console.error(error);
  }
});

router.get('/git', (req, res) =>
  res.redirect('https://github.com/busy-boys/project-2')
);

router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.error(error);
  }
});

// TODO add route for manager

module.exports = router;
