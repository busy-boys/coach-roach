const { CoachingSession } = require('../models');

const coachingData = [
  {
    start_time: 9,
    location: 'Pongatoga',
    duration: 2,
    topic: 'cocaine',
    complete: true,
    signedOff: false,
  },
  {
    start_time: 1,
    location: 'Willagonga',
    duration: 4,
    topic: 'alsococaine',
    complete: false,
    signedOff: true,
  },
];

const seedCoachingData = async () => {
  await CoachingSession.bulkCreate(coachingData, {
    individualHooks: true,
  });
};

module.exports = seedCoachingData;
