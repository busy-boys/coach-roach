const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { User, CoachingSession } = require('../models');

// DH importing authCheck middleware
const authCheck = require('../utils/authCheck');

router.get('/', authCheck, async (req, res) => {
  try {
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

router.get('/mysessions', authCheck, async (req, res) => {
  try {
    // Get the loggedIn users session data.
    // const userID = 1003;
    const { userID } = req.session;
    const dbSessionsData = await CoachingSession.findAll({
      where: {
        [Op.or]: {
          senior_coordinator_id: userID,
          supervisor_id: userID,
          superintendent_id: userID,
        },
      },
      include: [
        {
          model: User,
          as: 'senior_coordinator',
        },
        {
          model: User,
          as: 'superintendent',
        },
        {
          model: User,
          as: 'supervisor',
        },
      ],
    });
    // clean it up=
    const userSessions = dbSessionsData.map((session) =>
      session.get({ plain: true })
    );

    // console.log(userSessions);
    // add all sessions together into one array

    // console.log(allUserSessions);
    // sort out sessions
    const scheduledSessions = [];
    const pendingSignOff = [];
    const pastTraining = [];

    await userSessions.forEach(async (session) => {
      const sessionTime = new Date(session.start_time);
      const nowTime = new Date();
      // triage results.
      if (sessionTime.getTime() >= nowTime.getTime()) {
        scheduledSessions.push(session);
      } else if (
        sessionTime.getTime() < nowTime.getTime() &&
        ((!session.senior_coordinator_signedOff &&
          session.senior_coordinator_id) ||
          (!session.supervisor_signedOff && session.supervisor_id) ||
          (!session.superintendent_signedOff && session.superintendent_id))
      ) {
        pendingSignOff.push(session);
      } else {
        pastTraining.push(session);
      }
    });
    // console.log(scheduledSessions);
    // console.log(pendingSignOff);
    // console.log(pastTraining);

    res.render('my-sessions', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userID,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      email: req.session.email,
      scheduledSessions,
      pendingSignOff,
      pastTraining,
    });
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
    res.render('my-stats', { graphData });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/mystats', (req, res) => {
  try {
    res.render('my-stats');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/booksession', authCheck, async (req, res) => {
  // get managers unto separate arrays
  const superintendentsUnsanitised = await User.findAll({
    attributes: ['id', 'first_name', 'last_name'],
    where: {
      role: 'Superintendent',
    },
  });

  const seniorCoordinatorsUnsanitised = await User.findAll({
    attributes: ['id', 'first_name', 'last_name'],
    where: {
      role: 'Senior Coordinator',
    },
  });

  const supervisorsUnsanitised = await User.findAll({
    attributes: ['id', 'first_name', 'last_name'],
    where: {
      role: 'Supervisor',
    },
  });

  // clean up the data; simplify each element to 3 attributes
  const superintendents = superintendentsUnsanitised.map((superintendent) =>
    superintendent.get({ plain: true })
  );

  const seniorCoordinators = seniorCoordinatorsUnsanitised.map(
    (seniorCoordinator) => seniorCoordinator.get({ plain: true })
  );

  const supervisors = supervisorsUnsanitised.map((supervisor) =>
    supervisor.get({ plain: true })
  );

  try {
    res.render('book-session', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userID,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      email: req.session.email,
      superintendents,
      seniorCoordinators,
      supervisors,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
