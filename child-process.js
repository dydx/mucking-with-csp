const createPool = require('@paybase/pool');
const { spawn } = require('child_process');
const assert = require('assert');

const { run, close } = createPool({
  poolSize: 10,
  createProcess: () => {
    const p = spawn('cat', [ '-' ]);
    p.stdin.setEncoding('utf-8');
    p.stdout.setEncoding('utf-8');
    return p;
  },
  handler: (p, input) =>
    new Promise(resolve => {
      p.stdout.once('data', d => {
        assert(d, input);
        console.log(`Received data: ${d.trim()} from pid: ${p.pid}`);
        resolve(d);
      });
      console.log(`Sending data: ${input.trim()} to pid: ${p.pid}`);
      p.stdin.write(input);
    }),
});

(async () => {
  const inputs = Array.from({ length: 100 }, (_, i) => run(`${++i}\n`));
  await Promise.all(inputs);
  close();
})();
