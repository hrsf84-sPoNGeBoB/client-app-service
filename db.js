const elasticsearch = require('elasticsearch');
const cassandra = require('cassandra-driver');

const videosClient = new elasticsearch.Client({
  host: `localhost:${process.env.VIDEOS_DB_PORT || 9200}`,
  log: 'trace',
});

const channelsClient = new cassandra.Client({
  contactPoints: [`localhost:${process.env.CHANNELS_DB_PORT || 9042}`],
});

module.exports = {
  videosClient,
  channelsClient,
};
