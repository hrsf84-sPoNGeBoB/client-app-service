const Client = require('elasticsearch').Client;
const client = new Client({
  host: 'localhost:9200',
  log: 'trace'
});
