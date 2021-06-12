const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./connection');

// Session Midleware Config
module.exports = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 15 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
