const router = require('express').Router();

/*
 * Service routes
 */
router.use('/info', require('./info'));

/*
 * Client routes
 */
router.use('/event', require('./event'));
router.get('/results', require('./results'));
router.get('/watch', require('./watch'));

module.exports = router;
