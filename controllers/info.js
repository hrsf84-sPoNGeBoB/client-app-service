const router = require('express').Router();
const videos = require('../models/videos');
const channels = require('../models/channels');

router.post('/info', (req, res) => {
  const { type, data } = req.body;

  if (type === 'video') {
    videos.addVideoEntry(data);
  } else if (type === 'channel') {
    channels.addChannel(data);
  }

  res.send();
});

module.exports = router;
