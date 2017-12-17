const router = require('express').Router();
const axios = require('axios');

const informationService = process.env.INFO_SERVICE;
const adService = process.env.AD_SERVICE;

router.get('/watch', (req, res) => {
  const { v } = req.query;

  const requests = [];

  if (informationService) {
    const infoUrl = `${informationService}/video/${v}`;
    requests.push(axios.get(infoUrl));
  } else console.log('Information service not found');

  if (adService) {
    const adUrl = `${adService}/ads`;
    requests.push(axios.get(adUrl, { params: { v } }));
  } else console.log('Ad service not found');

  Promise.all(requests)
    .then((responses) => {
      responses.forEach(serviceResponse => res.write(serviceResponse));
      res.send();
    })
    .catch((reason) => {
      console.log('\n\n[GET /watch]\n', reason);
      res.send();
    });
});

module.exports = router;
