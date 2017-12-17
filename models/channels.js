const { channelsClient } = require('../db');

const addChannel = (channel) => {
  // TODO destructure channel to pass into insert query
  const query = '';
  channelsClient.execute(query);
};

const isSubscribed = (channel1, channel2) => {};

const batchInsert = (channels) => {
  // TODO generate string of queries
  channelsClient.batch();
};

module.exports = {
  addChannel,
  isSubscribed,
};
