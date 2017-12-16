const faker = require('faker');
const jsonfile = require('jsonfile');
const moment = require('moment');

const file = './data/fake-channel-data.json';

const PROCESSES = 100000;
const TARGET = 10000000;

(function () {
  const then = moment();
  let count = 0;

  const fn = () => {
    count += 1;

    const channel = {
      channel_id: faker.random.uuid(),
      channel_name: faker.internet.userName(),
      subscriptions: {},
    };

    const subs = Math.floor(Math.random() * 50);

    for (let i = 0; i < subs; i += 1) {
      channel.subscriptions[faker.random.uuid()] = true;
    }

    jsonfile.writeFile(file, channel, { flag: 'a', spaces: 0, EOL: '\r\n' }, (err) => {
      if (err) {
        console.log('Bad write', err);
        count -= 1;
      } else if (count === TARGET) console.log(then.diff(moment()));
      else if (count % 100000 === 0) console.log('Count:', count);
      if (count < TARGET) fn();
    });
  };

  for (let i = 0; i < PROCESSES; i += 1) fn();
}());
