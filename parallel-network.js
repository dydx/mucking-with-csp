const createPool = require('@paybase/pool');
const fetch = require('node-fetch');
const assert = require('assert');

const { run, close } = createPool({
  poolSize: 2,
  createProcess: () => Symbol('ticket'),
  handler: (_, query) => {
    console.log(`Running request with query: ${query}`);
    return fetch(`https://postman-echo.com/get?q=${query}`)
      .then(res => res.json())
      .then(res => assert.equal(res.args.q, query))
      .then(_ => console.log('Request completed successfully'));
  }
});

(async () => {
  const queries = Array.from({ length: 20 }, (_, i) => run(`${++i}`));
  await Promise.all(queries);
  close();
})();
