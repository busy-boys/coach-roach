const { CoachingSession } = require('../models');

const coachingData = [
  {
    start_time: Date.now(),
    location: 'Perth',
    duration: 2,
    topic: 'Pre-start meeting',
    complete: true,
    signedOff: false,
    senior_coordinatorId: 3,
    supervisorId: 2,
    superintendentId: 1,
  },
  {
    start_time: Date.now(),
    location: 'Woolgorong',
    duration: 4,
    topic: 'LiF meeting',
    complete: false,
    signedOff: true,
    senior_coordinatorId: 4,
    supervisorId: 2,
    superintendentId: null,
  },
];

const seedCoachingData = async () => {
  await CoachingSession.bulkCreate(coachingData, {
    individualHooks: true,
  });
};

module.exports = seedCoachingData;
