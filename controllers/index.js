const router = require('express').Router();

const topLevelRoutes = require('./top-level-routes.js');

router.use('/', topLevelRoutes);

module.exports = router;
