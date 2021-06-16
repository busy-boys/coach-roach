const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { User, CoachingSession } = require('../models');

// DH importing authCheck middleware
const authCheck = require('../utils/authCheck');

router.get('/', authCheck, async (req, res) => {
  try {
    console.log('loading home??');
    res.render('home', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userID,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      email: req.session.email,
    });
  } catch (error) {
    console.error(error);
  }
});

// git redirect
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

router.get('/mysessions', (req, res) => {
  try {
    res.render('my-sessions');
  } catch (error) {
    console.error(error);
  }
});

router.get('/mysessions', (req, res) => {
  try {
    res.render('my-sessions');
  } catch (error) {
    console.error(error);
  }
});
router.get('/mystats', async (req, res) => {
  const testID = [1005];
  try {
    const dbSessionData = await CoachingSession.findAll({
      attributes: [
        'start_time',
        'duration',
        'senior_coordinator_id',
        'supervisor_id',
        'superintendent_id',
      ],
      where: {
        // Getting all sessions where complete = true AND
        // where one of the participants have an ID that matches testID
        [Op.or]: {
          senior_coordinator_id: testID,
          supervisor_id: testID,
          superintendent_id: testID,
        },
        [Op.and]: { complete: true },
      },
    });
    const cleanData = dbSessionData.map((data) => data.get({ plain: true }));

    // (jan is 0, june is 5).
    // This will give me all the values in the cleanData array where start_time has a month value of june.
    // Eventually there will be a switch function or something here to get the values for each month.
    const getAllJunes = cleanData.filter(
      (data) => data.start_time.getMonth() === 5
    );
    console.log('getAllJunes', getAllJunes);

    // THis will grab all the values for the duration parameter in every June session.
    const allJuneDurations = getAllJunes.map((a) => a.duration);
    console.log(allJuneDurations);

    // This adds them up to get total hours per month. This value needs to be passed to the graphing function.
    const totalDurationsforJune = allJuneDurations.reduce((a, b) => a + b, 0);
    console.log(totalDurationsforJune);

    res.render('my-stats', { cleanData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO add route for manager

module.exports = router;
