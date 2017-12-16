const { Client } = require('elasticsearch');

const client = new Client({
  host: 'localhost:9200',
  log: 'trace',
});

console.log('Database loaded');
