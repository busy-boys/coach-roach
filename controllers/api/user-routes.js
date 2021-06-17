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

router.get('/mygraphdata', async (res, req) => {
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

    const graphData = {
      January: totalHoursForAllMonths[0],
      February: totalHoursForAllMonths[1],
      March: totalHoursForAllMonths[2],
      April: totalHoursForAllMonths[3],
      May: totalHoursForAllMonths[4],
      June: totalHoursForAllMonths[5],
      July: totalHoursForAllMonths[6],
      August: totalHoursForAllMonths[7],
      September: totalHoursForAllMonths[8],
      October: totalHoursForAllMonths[9],
      November: totalHoursForAllMonths[10],
      December: totalHoursForAllMonths[11],
    };
    console.log('graphData:', graphData);
  } catch (err) {
    console.error(err);
  }
});

// Not sure about if I need to clear coookie here

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.clearCookie();
      res.redirect('/');
    });
  }
});

module.exports = router;
