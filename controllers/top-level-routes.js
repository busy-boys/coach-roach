const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { User, CoachingSession } = require('../models');

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

// Login or Signup a new user.
router.get('/login', async (req, res) => {
  try {
    // Get Manager Data from DB
    const dbManagerData = await User.findAll({
      attributes: ['id', 'first_name', 'last_name'],
      where: {
        [Op.or]: [{ role: 'Senior Coordinator' }, { role: 'Superintendent' }],
      },
    });

    const managers = await dbManagerData.map((manager) =>
      manager.get({ plain: true })
    );

    console.log(managers);
    res.render('login', { managers });
  } catch (error) {
    console.error(error);
  }
});

// TODO add route for manager

module.exports = router;
