const User = require('./User');
const CoachingSession = require('./CoachingSession');
const UserCoachingSession = require('./UserCoachingSession');

// I think many-to-many makes sense but I'm still not completely sure...

User.belongsToMany(CoachingSession, {
  through: UserCoachingSession,
  //   as: 'coachingSession',
  foreignKey: 'user_id',
});

CoachingSession.belongsToMany(User, {
  through: UserCoachingSession,
  //   as: 'user',
  foreignKey: 'coaching_session_id',
  //   constraints: false,
});

module.exports = { User, CoachingSession, UserCoachingSession };
