const { channel, put, take } = require('@paybase/csp');
const { timeout } = require('./utils');

const wiff = channel();
const waff = channel();

const createBall = () => ({ hits: 0, status: '' });

const createBat = async (inbound, outbound) => {
  while(true) {
    const ball = await take(inbound);
    ball.hits++;
    ball.status = ball.status === 'wiff!' ? 'waff!' : 'wiff!';
    console.log(`Ball hit ${ball.hits} time(s), ${ball.status}`);
    await timeout(500);
    await put(outbound, ball);
  }
};

createBat(waff, wiff);
createBat(wiff, waff);

put(waff, createBall());
