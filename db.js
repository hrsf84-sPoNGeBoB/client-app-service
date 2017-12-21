const cassandra = require('cassandra-driver');
const elasticsearch = require('elasticsearch');

const cassandraClient = new cassandra.Client({
  contactPoints: [
    `${process.env.CASSANDRA_URI || 'localhost'}:${process.env.CASSANDRA_PORT || 9042}`,
  ],
});

cassandraClient.connect((error) => {
  if (error) console.log('Problem connecting to Cassandra', error);
  else console.log('Connected to Cassandra');
});

const esearchClient = new elasticsearch.Client({
  host: `${process.env.ESEARCH_URI || 'localhost'}:${process.env.ESEARCH_PORT || 9200}`,
  // log: 'trace',
});

module.exports = {
  cassandraClient,
  esearchClient,
};
