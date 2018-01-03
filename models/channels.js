const client = require('../db').cassandraClient;

const KEYSPACE = 'channels';
const TABLE = 'channels';
const channelsKeyspaceQuery = `CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE} WITH REPLICATION = {'class': '${process.env.CASSANDRA_NET_CLASS}', ${process.env.CASSANDRA_NET_STRATEGY}};`;

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

const isSubscribed = (viewerId, channelId) => {
  const query = `SELECT subscriptions FROM ${KEYSPACE}.${TABLE} WHERE channel_id = ?`;

  return new Promise((resolve, reject) => {
    client.execute(query, [viewerId], { prepare: true })
      .then((result) => {
        const { subscriptions } = result.rows[0];
        resolve(!!subscriptions[channelId]);
      })
      .catch(error => reject(error));
  });
};

module.exports = {
  addChannel,
  batchInsertChannels,
  isSubscribed,
};
