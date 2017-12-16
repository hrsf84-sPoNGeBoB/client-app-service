const { videosClient } = require('../db');

const addVideoEntry = () => {};

const queryResults = q => videosClient.search({ q });

module.exports = {
  addVideoEntry,
  queryResults,
};
