const client = require('../db').esearchClient;

const INDEX = 'testing';
const TYPE = 'videos';

const addVideoEntry = video => (
  client.create({
    index: INDEX,
    type: TYPE,
    body: video,
  })
);

const batchInsertVideos = (videos) => {
  const body = [];
  const action = {
    index: {
      _index: INDEX,
      _type: TYPE,
    },
  };

  // add videos to body
  videos.forEach(video => body.push(action, video));
  return client.bulk({ body });
};

const queryResults = q => (
  client.search({ q, index: INDEX })
);

module.exports = {
  addVideoEntry,
  batchInsertVideos,
  queryResults,
};
