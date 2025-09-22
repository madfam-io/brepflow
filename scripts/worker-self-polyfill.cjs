const { parentPort } = require('worker_threads');

if (typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}

if (typeof globalThis.WorkerGlobalScope === 'undefined') {
  globalThis.WorkerGlobalScope = function WorkerGlobalScope() {};
}

if (parentPort) {
  if (typeof globalThis.self.addEventListener !== 'function') {
    globalThis.self.addEventListener = (event, handler) => {
      if (event === 'message') {
        parentPort.on('message', (data) => handler({ data }));
      }
    };
  }

  if (typeof globalThis.self.postMessage !== 'function') {
    globalThis.self.postMessage = (data) => parentPort.postMessage(data);
  }
}
