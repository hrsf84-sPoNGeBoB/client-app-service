const { videosClient } = require('../db');

const addVideoEntry = (video) => {
  videosClient.create({});
};

const queryResults = q => videosClient.search({ q });

module.exports = {
  addVideoEntry,
  queryResults,
};
