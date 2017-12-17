const router = require('express').Router();
const axios = require('axios');

const eventsService = process.env.EVENTS_SERVICE;

router.post('/event', (req, res) => {
  if (eventsService) {
    const { body: event } = req;
    const eventsUrl = `${eventsService}/events`;
    // TODO format event data to post to events service
    axios.post(eventsUrl, event);
  } else console.log('Events service not found');

  res.send();
});

module.exports = router;
