const client = require('../db').cassandraClient;

client.connect((error) => {
  if (error) console.log('Problem connecting to Cassandra', error);
  else console.log('Connected to Cassandra');
});

const KEYSPACE = 'channels';
const TABLE = 'channels';
const channelsKeyspaceQuery = `CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE} WITH REPLICATION = {'class': '${process.env.CASSANDRA_REPL_CLASS}', 'replication_factor': ${process.env.CASSANDRA_REPL_FACTOR}};`;

client.execute(channelsKeyspaceQuery) // Set up keyspace
  .then(() => {
    console.log('Cassandra channels keyspace active');

    const channelsTableQuery = `CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE} (channel_id text PRIMARY KEY, subscriptions map<text, boolean>);`;

    client.execute(channelsTableQuery) // Set up table
      .then(() => {
        console.log('Cassandra channels table up');
      })
      .catch(error => console.log('Error with Cassandra channels table', error));
  })
  .catch(error => console.log('Error with Cassandra channels keyspace', error));

const addChannel = (channel) => {
  const query = `INSERT INTO ${KEYSPACE}.${TABLE} JSON ?;`;
  const params = [JSON.stringify({
    channel_id: channel.channel_id,
    subscriptions: channel.subscriptions,
  })];

  return client.execute(query, params, { prepare: true });
};

const batchInsertChannels = (channels) => {
  const query = `INSERT INTO ${KEYSPACE}.${TABLE} JSON ?;`;
  const queries = [];

  channels.forEach((channel) => {
    queries.push({
      query,
      params: [JSON.stringify({
        channel_id: channel.channel_id,
        subscriptions: channel.subscriptions,
      })],
    });
  });

  return client.batch(queries, { prepare: true });
};

const isSubscribed = (channel1, channel2) => {
  const query = `SELECT subscriptions FROM ${KEYSPACE}.${TABLE} WHERE channel_id = ?`;

  return new Promise((resolve, reject) => {
    client.execute(query, [channel1], { prepare: true })
      .then((results) => {
        const { subscriptions } = results.rows[0];
        resolve(!!subscriptions[channel2]);
      })
      .catch(error => reject(error));
  });
};

module.exports = {
  addChannel,
  batchInsertChannels,
  isSubscribed,
};
