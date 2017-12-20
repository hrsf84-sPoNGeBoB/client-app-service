const client = require('../db').esearchClient;

const addVideoEntry = (video) => {
  client.create({
    index: 'videos',
    type: 'video',
    body: video,
  });
};

const queryResults = q => client.search({ q });

module.exports = {
  addVideoEntry,
  queryResults,
};
