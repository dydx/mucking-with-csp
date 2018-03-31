const { channel, put, take } = require('@paybase/csp');
const { timeout, randInt } = require('./utils');

const numberOfUsers = 10;
const numberOfCubicles = 2;

const createCubicle = (number) =>
  ({
    number,
    lock: () => console.log(`Locking cubicle ${number} door!`),
    use: () => timeout(randInt(500, 1000)),
    unlock: () => console.log(`Unlocking cubicle ${number} door!`),
  });

const createBathroom = (cubicles) => {
  const bathroom = channel();
  Array.from({ length: cubicles }, (_, i) => put(bathroom, createCubicle(++i)));
  return bathroom;
};

const useBathroom = async (bathroom, user) => {
  console.log(`User ${user} is waiting for a cubicle`);
  const cubicle = await take(bathroom);
  console.log(`User ${user} is using cubicle ${cubicle.number}`);
  cubicle.lock();
  await cubicle.use();
  cubicle.unlock();
  console.log(`User ${user} has finished using cubicle ${cubicle.number}`);
  put(bathroom, cubicle);
};

(async () => {
  const bathroom = createBathroom(numberOfCubicles);
  const queue = Array.from({ length: numberOfUsers }, (_, i) => useBathroom(bathroom, ++i));
  await Promise.all(queue);
})();
