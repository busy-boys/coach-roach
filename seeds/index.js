require('dotenv').config();
const sequelize = require('../config/connection');
const seedUserData = require('./userData');
const seedCoachingData = require('./coachingSessionData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUserData();

  await seedCoachingData();

  process.exit(0);
};

seedDatabase();
