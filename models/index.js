const User = require('./User');
const CoachingSession = require('./CoachingSession');
// const UserCoachingSession = require('./UserCoachingSession');

User.hasMany(CoachingSession, {
  foreignKey: 'senior_coordinatorId',
});

User.hasMany(CoachingSession, {
  foreignKey: 'supervisorId',
});

User.hasMany(CoachingSession, {
  foreignKey: 'superintendentId',
});

CoachingSession.belongsTo(User, {
  foreignKey: 'senior_coordinatorId',
});

CoachingSession.belongsTo(User, {
  foreignKey: 'supervisorId',
});

CoachingSession.belongsTo(User, {
  foreignKey: 'superintendentId',
});

User.hasOne(User, {
  foreignKey: 'managerId',
  as: 'Manager',
});

module.exports = { User, CoachingSession };
