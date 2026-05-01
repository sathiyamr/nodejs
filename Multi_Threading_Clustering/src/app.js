const express = require("express");
const path = require("path");
const { Worker } = require("worker_threads");
const app = express();

app.get("/non-blocking", (req, res, next) => {
  res.status(200).json({ message: "Non Blocking URL" });
});

app.get("/blocking", (req, res, next) => {
  const worker = new Worker(path.resolve(__dirname, "worker.js"));
  worker.postMessage('');

  worker.on("message", (result) => {
    console.log("Result from worker:", result);
    res.status(200).json({ message: "Blocking URL Overall total" + result });

    worker.terminate(); // ✅ clean and controlled

  });

  worker.on("error", (err) => {
    console.error("Worker error:", err);

    worker.terminate(); // ✅ clean and controlled

  });

});

app.listen(7777, () => {
  console.log("My app server is listening port number 7777.....");
});
