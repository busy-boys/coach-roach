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

router.get('/mysessions', async (req, res) => {
  try {
    // TODO
    // Get future sessions for me
    // Get Pending signoffs (PAST)
    // Get PAST that are signed off.

    // Get the loggedIn users session data.
    const dbSessionsData = await User.findByPk(1002, {
      include: [
        {
          model: CoachingSession,
          as: 'senior_coordinator_sessions',
          // include: [{ model: User, as: 'senior_coordinator' }],
        },
        {
          model: CoachingSession,
          as: 'superintendent_sessions',
          // include: [{ model: User, as: 'superintendent' }],
        },
        {
          model: CoachingSession,
          as: 'supervisor_sessions',
          // where: { supervisor_id: id },
          include: [{ model: User, as: 'supervisor' }],
        },
      ],
    });
    // clean it up
    const userSessions = dbSessionsData.get({ plain: true });
    console.log(userSessions);
    // add all sessions together into one array
    const allUserSessions = userSessions.senior_coordinator_sessions.concat(
      userSessions.superintendent_sessions,
      userSessions.supervisor_sessions
    );
    // console.log(allUserSessions);
    // sort out sessions
    const scheduledSessions = [];
    const pendingSignOff = [];
    const pastTraining = [];

    await allUserSessions.forEach(async (session) => {
      const sessionTime = new Date(session.start_time);
      const nowTime = new Date();
      // get names of session members
      // const seniorCordinator = await User.findByPk(
      //   session.senior_coordinator_id
      // );
      // session.senior_cordinator = seniorCordinator.get({ plain: true });

      // const supervisor = await User.findByPk(session.supervisor_id);
      // session.supervisor = supervisor.get({ plain: true });

      // const superintendent = await User.findByPk(session.superintendent_id);
      // session.superintendent = superintendent.get({ plain: true });

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
    console.log(scheduledSessions);
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

// TODO add route for manager

module.exports = router;
