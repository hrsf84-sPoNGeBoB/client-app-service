const { videosClient } = require('../db');

const addVideoEntry = (video) => {
  videosClient.create({
    index: 'videos',
    type: 'video',
    body: video,
  });
};

const queryResults = q => videosClient.search({ q });

module.exports = {
  addVideoEntry,
  queryResults,
};
