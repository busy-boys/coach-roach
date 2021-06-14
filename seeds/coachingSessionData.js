const { CoachingSession } = require('../models');

const coachingData = [
  {
    start_time: Date.now(),
    location: 'Perth',
    duration: 2,
    topic: 'Pre-start meeting',
    complete: true,
    signedOff: false,
    senior_coordinator_id: 3,
    supervisor_id: 2,
    superintendent_id: 1,
  },
  {
    start_time: Date.now(),
    location: 'Woolgorong',
    duration: 4,
    topic: 'LiF meeting',
    complete: false,
    signedOff: true,
    senior_coordinator_id: 4,
    supervisor_id: 2,
    superintendent_id: null,
  },
];

const seedCoachingData = async () => {
  await CoachingSession.bulkCreate(coachingData, {
    individualHooks: true,
  });
};

module.exports = seedCoachingData;
