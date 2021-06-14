const User = require('./User');
const CoachingSession = require('./CoachingSession');
// const UserCoachingSession = require('./UserCoachingSession');

User.hasMany(CoachingSession, {
  foreignKey: 'senior_coordinatorId',
});

User.hasMany(CoachingSession, {
  foreignKey: 'supervisor_id',
});

User.hasMany(CoachingSession, {
  foreignKey: 'superintendent_id',
});

CoachingSession.belongsTo(User, {
  foreignKey: 'senior_coordinator_id',
});

CoachingSession.belongsTo(User, {
  foreignKey: 'supervisor_id',
});

CoachingSession.belongsTo(User, {
  foreignKey: 'superintendent_id',
});

User.hasOne(User, {
  foreignKey: 'manager_id',
  as: 'Manager',
});

module.exports = { User, CoachingSession };
