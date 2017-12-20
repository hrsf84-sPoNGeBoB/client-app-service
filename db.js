const elasticsearch = require('elasticsearch');
const cassandra = require('cassandra-driver');

const esearchClient = new elasticsearch.Client({
  host: `${process.env.ESEARCH_URI || 'localhost'}:${process.env.ESEARCH_PORT || 9200}`,
  log: 'trace',
});

const cassandraClient = new cassandra.Client({
  contactPoints: [
    `${process.env.CASSANDRA_URI || 'localhost'}:${process.env.CASSANDRA_PORT || 9042}`,
  ],
});

module.exports = {
  esearchClient,
  cassandraClient,
};
