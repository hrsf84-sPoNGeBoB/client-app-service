const router = require('express').Router();

/*
 * Service routes
 */
router.use('/info', require('./info'));

/*
 * Client routes
 */
router.use('/event', require('./event'));
router.use('/results', require('./results'));
router.use('/watch', require('./watch'));

module.exports = router;
