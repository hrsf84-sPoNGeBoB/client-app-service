const moment = require('moment');
const fs = require('fs');
const readline = require('readline');
const channelsClient = require('../models/channels');
const videosClient = require('../models/videos');

const channelsFile = './data/mock-channel-data.json';
const videosFile = './data/mock-video-data.json';

const CHANNEL_BATCH_LEN = 10;
const VIDEO_BATCH_LEN = 25;

const readChannels = readline.createInterface({ input: fs.createReadStream(channelsFile) });
let batch = [];

readChannels.on('line', (line) => {
  batch.push(JSON.parse(line));

  if (batch.length >= CHANNEL_BATCH_LEN) {
    try {
      const fn = async () => { await channelsClient.batchInsertChannels(batch); };
      fn();
    } catch (e) {
      console.log('Bad batch insert', e);
    }
    batch = [];
  }
});

readChannels.on('close', () => {
  console.log('Done inserting channels');

  const readVideos = readline.createInterface({ input: fs.createReadStream(videosFile) });
  batch = [];
  let count = 0;
  const startTime = moment();

  readVideos.on('line', (line) => {
    count += 1;
    if (count % 100000 === 0) console.log(count, moment().diff(startTime));
    batch.push(JSON.parse(line));

    if (batch.length >= VIDEO_BATCH_LEN) {
      try {
        const fn = async () => { await videosClient.batchInsertVideos(batch); };
        fn();
      } catch (e) {
        console.log('Bad batch insert');
      }
      batch = [];
    }
  });

  readVideos.on('close', () => console.log('Done inserting videos'));
});
