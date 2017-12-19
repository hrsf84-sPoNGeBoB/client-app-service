const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

const channelFile = './data/mock-channel-data.json';
const videoFile = './data/mock-video-data.json';

const TARGET_VIDEOS = 10000000; // 10m
const TARGET_CHANNELS = 10000; // expensive to make, keep small
const SUB_CHANCE = 0.015;

(function () {
  let startTime = moment();
  const channels = [];

  // Generate channels in memory
  for (let i = 0; i < TARGET_CHANNELS; i += 1) {
    const channel = {
      channel_id: faker.random.uuid().slice(0, 13),
      channel_name: faker.internet.userName(),
      subscriptions: {},
    };

    channels.push(channel);
  }

  // Assign subscriptions
  for (let i = 0; i < channels.length; i += 1) {
    for (let j = 0; j < channels.length; j += 1) {
      if (j !== i && Math.random() < SUB_CHANCE) {
        channels[i].subscriptions[channels[j].channel_id] = true;
      }
    }
  }

  startTime = moment();
  const channelStream = fs.createWriteStream(channelFile, { flags: 'a', encoding: null });

  // Write channels
  channelStream.once('open', (fd) => {
    channels.forEach((channel) => {
      fs.writeSync(fd, `${JSON.stringify(channel)}\n`, (err) => { if (err) console.log('Bad write'); });
    });

    channelStream.end();
    console.log('Finished generating channels', moment().diff(startTime));
  });

  channelStream.on('finish', () => {
    channels.forEach((_, i) => delete channels[i].subscriptions);

    startTime = moment();
    const videoStream = fs.createWriteStream(videoFile, { flags: 'a', encoding: null });

    // Generate and write videos
    videoStream.once('open', (fd) => {
      const video = {
        snippet: {
          thumbnails: {
            default: {
              url: 'http://lorempixel.com/120/90',
              width: 120,
              height: 90,
            },
          },
        },
      };

      for (let i = 0; i < TARGET_VIDEOS; i += 1) {
        if (i % 100000 === 0) console.log(i, moment().diff(startTime));

        const id = Math.floor(Math.random() * channels.length);
        video.id = channels[id].channel_id;
        video.channel_name = channels[id].channel_name;
        video.snippet.title = faker.random.words(2 + Math.floor(Math.random() * 8));
        video.snippet.description = faker.random.words(10 + Math.floor(Math.random() * 15));

        fs.writeSync(fd, `${JSON.stringify(video)}\n`, (err) => { if (err) console.log('Bad write'); });
      }

      videoStream.end();
      console.log('Finished generating videos', moment().diff(startTime));
    });
  });
}());
