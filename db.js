const cassandra = require('cassandra-driver');
const elasticsearch = require('elasticsearch');

const cassandraUri = `${process.env.CASSANDRA_URI || 'localhost'}:${process.env.CASSANDRA_PORT || 9042}`;
console.log(cassandraUri);

const cassandraClient = new cassandra.Client({
  contactPoints: [cassandraUri],
});


const esearchUri = `${process.env.ESEARCH_URI || 'localhost'}:${process.env.ESEARCH_PORT || 9200}`;

const esearchClient = new elasticsearch.Client({
  host: esearchUri,
  // log: 'trace'
});

module.exports = {
  cassandraClient,
  esearchClient,
};
