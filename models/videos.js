const client = require('../db').esearchClient;

const INDEX = 'testing';
const TYPE = 'videos';

const addVideoEntry = video => (
  new Promise((resolve, reject) => {
    client.create({
      index: INDEX,
      type: TYPE,
      body: video,
    }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
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

  return new Promise((resolve, reject) => {
    client.bulk({ body }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const queryResults = q => (
  new Promise((resolve, reject) => {
    client.search({ q, index: INDEX }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  })
);

module.exports = {
  addVideoEntry,
  batchInsertVideos,
  queryResults,
};
