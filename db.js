const elasticsearch = require('elasticsearch');
const cassandra = require('cassandra-driver');

const searchClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

