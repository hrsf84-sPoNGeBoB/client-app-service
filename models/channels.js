const client = require('../db').cassandraClient;

const KEYSPACE = 'testspace';
const channelsKeyspaceQuery =
  `CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE} ` +
    `WITH REPLICATION = {'class': '${process.env.CASSANDRA_REPL_CLASS}',` +
    `'replication_factor': ${process.env.CASSANDRA_REPL_FACTOR}};`;

const channelsTableQuery =
  `CREATE TABLE IF NOT EXISTS ${KEYSPACE}.channels (` +
    'id text PRIMARY KEY,' +
    'subscriptions map<text, boolean>' +
  ');';

client.execute(channelsKeyspaceQuery)
  .then(() => {
    console.log('Cassandra channels keyspace up');
    client.execute(channelsTableQuery)
      .then(() => {
        console.log('Cassandra channels table up');
      })
      .catch(error => console.log('Error with Cassandra channels table', error));
  })
  .catch(error => console.log('Error with Cassandra channels keyspace', error));

const addChannel = (channel) => {
  // TODO destructure channel to pass into insert query
  const query = '';
  client.execute(query);
};

const isSubscribed = (channel1, channel2) => {};

const batchInsert = (channels) => {
  // TODO generate string of queries
  client.batch();
};

module.exports = {
  addChannel,
  isSubscribed,
};
