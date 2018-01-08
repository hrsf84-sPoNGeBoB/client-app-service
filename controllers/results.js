const router = require('express').Router();
const videos = require('../models/videos');
const { logger } = require('./winston');

router.get('/results', (req, res) => {
  logger.info('GET /results', req);
  const searchQuery = req.query.search_query;

  if (searchQuery) {
    videos.queryResults(searchQuery).then(
      (body) => {
        console.log(body);
        res.send(body.hits.hits);
      },
      (error) => {
        console.log('\n\n[GET /results]\n', error);
        res.end();
      },
    );
  } else res.end();
});

module.exports = router;
