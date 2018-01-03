const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');

const esTransportOpts = {
  clientOpts: {
    host: `${process.env.ES_LOGGING_URI || 'http://localhost'}:${process.env.ES_LOGGING_PORT || 9200}`,
  },
  level: 'info',
};

const logger = new winston.Logger({
  transports: [
    new Elasticsearch(esTransportOpts),
  ],
});

module.exports = {
  logger,
};
