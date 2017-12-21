const router = require('express').Router();
const videos = require('../models/videos');

router.get('/results', (req, res) => {
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
