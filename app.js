const apm = require('elastic-apm-node').start({
  appName: 'client-app-service',
});
// const EC2 = require('aws-sdk/clients/ec2');
// const SQS = require('aws-sdk/clients/sqs');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(require('./controllers'));

app.use(apm.middleware.express());

const port = process.env.PORT || 13337;

app.listen(port, () => console.log(`App listening on port ${port}...`));
