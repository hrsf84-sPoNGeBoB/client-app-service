const axios = require('axios');
const jsonfile = require('jsonfile');
const randomWords = require('random-words');

const file = './data/real-youtube-data.json';

const TARGET = 100000;
const MAX_RESULTS = 50;

(function () {
  const apiKeys = [];

  for (let i = 0; i < 10; i += 1) {
    const k = `YT_API_${i}`;
    if (process.env[k]) apiKeys.push(process.env[k]);
  }

  const totalKeys = apiKeys.length;
  let count = 0;

  console.log('Keys:', totalKeys, '\n', apiKeys);

  const fetch = (key, query = randomWords(), pageToken) => {
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        pageToken,
        key,
        q: query,
        maxResults: Math.min(MAX_RESULTS, TARGET - count),
        part: 'snippet',
      },
    })
      .then(({ data: { items, nextPageToken } }) => {
        count += items.length;

        console.log('Got', query, pageToken, count, items.length);

        let npt;
        let q = query;

        if (items.length) {
          npt = nextPageToken;
          items.forEach((video) => {
            console.log('Writing to file', query, nextPageToken, items.length);

            jsonfile.writeFileSync(file, video, { flag: 'a', spaces: 0, EOL: '\r\n' }, (error) => {
              if (error) console.log('Error writing file:', file, error);
            });
          });
        } else {
          q = randomWords();
        }

        if (count < TARGET) fetch(key, q, npt);
      })
      .catch(() => {
        console.log('Bad', pageToken, count);

        if (count < TARGET) fetch(key, query, pageToken);
      });
  };

  apiKeys.forEach(key => fetch(key));
}());
