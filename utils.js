const timeout = async (duration) =>
  new Promise(resolve => setTimeout(resolve, duration));

const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
  timeout,
  randInt
};
