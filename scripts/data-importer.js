const moment = require('moment');
const fs = require('fs');
const readline = require('readline');
const channels = require('../db/channels');
const videos = require('../db/videos');

const channelFile = './data/mock-channel-data.json';
const videoFile = './data/mock-video-data.json';

(function () {
  const readChannels = readline.createInterface({ input: fs.createReadStream(channelFile) });
  const queries = [];
  const query = {
    query: 'INSERT INTO channels (key, JSON)',
  };

  readChannels.on('line', (line) => {
    // channelsClient.
  });

  readChannels.on('close', () => console.log('Done.'));
}());
