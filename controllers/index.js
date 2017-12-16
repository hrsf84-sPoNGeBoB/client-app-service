const router = require('express').Router();

/*
 * Service routes
 */
router.use(require('./info'));

/*
 * Client routes
 */
router.use(require('./event'));
router.use(require('./results'));
router.use(require('./watch'));

module.exports = router;
