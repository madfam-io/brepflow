const path = require('path');
const { Worker: BaseWorker } = require('worker_threads');

class NodeWorker extends BaseWorker {
  constructor(filename, options = {}) {
    const execArgv = Array.isArray(options.execArgv) ? [...options.execArgv] : [];
    execArgv.push('-r', path.resolve(__dirname, 'worker-self-polyfill.cjs'));
    super(filename, { ...options, execArgv });
  }
}

if (typeof global.Worker === 'undefined') {
  global.Worker = NodeWorker;
}
