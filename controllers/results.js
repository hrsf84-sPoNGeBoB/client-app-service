const router = require('express').Router();
const videosDb = require('../models/videos');

router.get('/results', (req, res) => {
  const searchQuery = req.query.search_query;

  if (searchQuery) {
    videosDb.queryResults(searchQuery).then(
      (body) => {
        console.log(body);
        res.send(body.hits.hits);
      },
      (error) => {
        console.log('\n\n[GET /results]\n', error);
        res.end();
      },
    );
  }
});

module.exports = router;
