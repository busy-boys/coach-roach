const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json('Dokku - server is up! -- database is up!');
  } catch (error) {
    res.status(500).json('error connectigng to db', error);
  }
});

module.exports = router;
