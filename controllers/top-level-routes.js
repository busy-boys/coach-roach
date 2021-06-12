const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    console.error(error);
  }
});

router.get('/git', (req, res) =>
  res.redirect('https://github.com/busy-boys/project-2')
);

module.exports = router;
