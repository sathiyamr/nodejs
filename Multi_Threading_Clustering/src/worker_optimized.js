const { parentPort, workerData } = require("worker_threads");

console.log(workerData.noOfThreads);

parentPort.on("message", () => {
  console.log("noOfThreads", workerData.noOfThreads);

  let total = 0;
  for (let i = 0; i < 1000000000; i++) {
    total += i;
  }

  parentPort.postMessage(total);
});
