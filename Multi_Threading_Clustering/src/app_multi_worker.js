// app.js
const { Worker } = require("worker_threads");
const path = require("path");

const NO_OF_WORKERS = 2;

for (let i = 0; i < NO_OF_WORKERS; i++) {
  const worker = new Worker(path.resolve(__dirname, "worker_multiple_cpu.js"));

  worker.on("message", (msg) => {
    console.log(`Worker done: ${msg}`);
  });

  worker.on("error", (err) => {
    console.error(err);
  });
}