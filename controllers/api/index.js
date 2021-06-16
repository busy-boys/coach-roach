const router = require('express').Router();

const userRoutes = require('./user-routes');
const coachingRoutes = require('./coaching-routes');

router.use('/user', userRoutes);
router.use('/coaching', coachingRoutes);

module.exports = router;
