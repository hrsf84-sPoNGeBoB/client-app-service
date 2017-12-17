const router = require('express').Router();
const videosDb = require('../models/videos');
const channelsDb = require('../models/channels');

router.post('/info', (req, res) => {
  const { type, data } = req.body;

  if (type === 'video') {
    videosDb.addVideoEntry(data);
  } else if (type === 'channel') {
    channelsDb.addChannel(data);
  }

  res.send();
});

module.exports = router;
