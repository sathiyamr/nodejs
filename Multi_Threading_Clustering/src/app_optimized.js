const express = require("express");
const path = require("path");
const { Worker } = require("worker_threads");
const app = express();

const NO_THREADS = 2;

const createWorker = () => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, "worker_optimized.js"), {
      workerData: { noOfThreads: NO_THREADS },
    });
    worker.postMessage("");

    worker.once("message", (result) => {
      console.log("Result from worker:", result);
      resolve(result);

      worker.terminate(); // ✅ clean and controlled
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err);

      worker.terminate(); // ✅ clean and controlled
      reject();
    });
  })
};

app.get("/non-blocking", (req, res, next) => {
  res.status(200).json({ message: "Non Blocking URL" });
});

app.get("/blocking", async (req, res, next) => {
  let workers = [];
  for (i = 0; i < 2; i++) {
    const wrk = createWorker();
    workers.push(wrk);
  }

  const allResult = await Promise.all(workers);
  res.status(200).json({ message: "Blocking URL Overall total" + allResult });
});

app.listen(7777, () => {
  console.log("My app server is listening port number 7777.....");
});
