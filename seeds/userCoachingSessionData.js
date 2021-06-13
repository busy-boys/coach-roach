const { UserCoachingSession } = require('../models');

const userCoachingSessionData = [
  {
    user_id: 1,
    coaching_session_id: 1,
  },
  {
    user_id: 2,
    coaching_session_id: 1,
  },
  {
    user_id: 3,
    coaching_session_id: 2,
  },
  {
    user_id: 1,
    coaching_session_id: 2,
  },
];

const seedUserCoachingSessionsData = async () => {
  await UserCoachingSession.bulkCreate(userCoachingSessionData, {
    individualHooks: true,
  });
};

module.exports = seedUserCoachingSessionsData;
