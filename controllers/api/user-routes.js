const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, CoachingSession } = require('../../models');

// create a user
router.post('/', async (req, res) => {
  try {
    const createUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      manager_id: req.body.manager_id,
    };
    // const salt = await bcrypt.genSalt(10);
    // Update the password key with new hashed password. SaltRounds is 10 (default value)
    // createUser.password = await bcrypt.hash(req.body.password, salt);
    // write user data to database
    const dbUserData = await User.create(createUser);
    // add info to req.session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = dbUserData.id;
      req.session.firstName = dbUserData.first_name;
      req.session.lastName = dbUserData.last_name;
      req.session.email = dbUserData.email;
      res.status(200).json(dbUserData);
    });
    // res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const userRequest = req.body;
    const dbUser = await User.findOne({ where: { email: req.body.email } });
    // If we find a user with that email, we can go ahead and compare passwords.
    if (dbUser) {
      const passwordToCheck = await bcrypt.compare(
        // Password given in request; need to check against our hashed password stored in dbUserData
        userRequest.password,
        dbUser.password
      );
      // If passwords match we get a true from the compare function and we get the logging in message.
      if (passwordToCheck) {
        await req.session.save(() => {
          req.session.loggedIn = true;
          req.session.userID = dbUser.id;
          req.session.firstName = dbUser.first_name;
          req.session.lastName = dbUser.last_name;
          req.session.email = dbUser.email;
          res.status(200).json({ message: 'Now logging in' });
        });
        // res.redirect('/');
        // console.log(req.session);
      } else {
        res.status(400).json({ error: 'Incorrect password' });
      }
    } else {
      res
        .status(400)
        .json({ error: 'No user with that email. Please try again' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
// Get all users
router.get('/', async (req, res) => {
  try {
    const dbAllUserData = await User.findAll({
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'first_name', 'last_name'],
        },
        {
          model: User,
          as: 'subordinates',
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });
    res.json(dbAllUserData);
  } catch (error) {
    console.error(error);
  }
});

router.get('/mygraphdata', async (req, res) => {
  // req.session.userID = 1004;
  console.log(req.session.userID);
  try {
    // const testSessionData = await CoachingSession.findAll();
    // console.log(testSessionData);
    const dbSessionData = await CoachingSession.findAll({
      // attributes: [
      //   'start_time',
      //   'duration',
      //   'senior_coordinator_id',
      //   'supervisor_id',
      //   'superintendent_id',
      //   'complete',
      // ],
      where: {
        // Getting all sessions where complete = true AND
        // where one of the participants have an ID that matches testID
        [Op.or]: {
          senior_coordinator_id: req.session.userID,
          supervisor_id: req.session.userID,
          superintendent_id: req.session.userID,
        },
        // [Op.and]: { complete: true },
      },
    });
    // console.log(dbSessionData);
    const cleanDataAll = dbSessionData.map((data) => data.get({ plain: true }));
    // delete from cleanData if complete = false
    //! DH: added to get getter function working!
    console.log(cleanDataAll);
    const cleanData = cleanDataAll.filter(function (session) {
      return session.complete === true;
    });

    console.log(cleanData);
    const totalHoursForAllMonths = [];
    for (let i = 0; i < 12; i++) {
      const getAllHoursPerMonth = cleanData.filter(
        (data) => data.start_time.getMonth() === i
      );

      // THis will grab all the values for the duration parameter in every June session.
      const getAllMonthlyHours = getAllHoursPerMonth.map((a) => a.duration);

      // This adds them up to get total hours per month. This value needs to be passed to the graphing function.
      const sumOfHoursPerMonth = getAllMonthlyHours.reduce((a, b) => a + b, 0);

      // Adding
      totalHoursForAllMonths.push(sumOfHoursPerMonth);
    }

    const graphData = [
      { month: 'January', minutes: totalHoursForAllMonths[0] },
      { month: 'February', minutes: totalHoursForAllMonths[1] },
      { month: 'March', minutes: totalHoursForAllMonths[2] },
      { month: 'April', minutes: totalHoursForAllMonths[3] },
      { month: 'May', minutes: totalHoursForAllMonths[4] },
      { month: 'June', minutes: totalHoursForAllMonths[5] },
      { month: 'July', minutes: totalHoursForAllMonths[6] },
      { month: 'August', minutes: totalHoursForAllMonths[7] },
      { month: 'September', minutes: totalHoursForAllMonths[8] },
      { month: 'October', minutes: totalHoursForAllMonths[9] },
      { month: 'November', minutes: totalHoursForAllMonths[10] },
      { month: 'December', minutes: totalHoursForAllMonths[11] },
    ];
    console.log('graphData:', graphData);
    return res.status(200).json(graphData);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
  }
});

// Not sure about if I need to clear coookie here

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.clearCookie();
      res.redirect('/');
    });
  }
});

module.exports = router;
