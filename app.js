const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(require('./controllers'));

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
