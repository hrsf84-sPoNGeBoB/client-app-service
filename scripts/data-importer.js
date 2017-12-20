const moment = require('moment');
const fs = require('fs');
const readline = require('readline');
const channelsClient = require('../models/channels');
const videosClient = require('../models/videos');

const channelsFile = './data/mock-channel-data.json';
const videosFile = './data/mock-video-data.json';

const BATCH_LEN = 10;

(function () {
  const readChannels = readline.createInterface({ input: fs.createReadStream(channelsFile) });
  let channels = [];

  readChannels.on('line', (line) => {
    channels.push(JSON.parse(line));

    if (channels.length >= BATCH_LEN) {
      try {
        // const batch = async () => { await channelsClient.batchInsertChannels(channels); };
        // batch();
        channels = [];
      } catch (e) {
        console.log('Bad batch insert', e);
      }
    }
  });

  readChannels.on('close', () => {
    channels = undefined;
    console.log('Done inserting channels.');

    const readVideos = readline.createInterface({ input: fs.createReadStream(videosFile) });

    readVideos.on('line', (line) => {
      console.log(line);
    });
  });
}());
