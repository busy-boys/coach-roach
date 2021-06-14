const router = require('express').Router();

const topLevelRoutes = require('./top-level-routes.js');
const apiRoutes = require('./api');

router.use('/', topLevelRoutes);
router.use('/api', apiRoutes);

module.exports = router;
