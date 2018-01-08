const { expect } = require('chai');
const request = require('supertest');
const rewire = require('rewire');

const server = rewire('../app');

describe('Client App Service Testing', () => {
  it('should response with status 200 when GET sent to /event', (done) => {
    // request(
    done();
  });
});
