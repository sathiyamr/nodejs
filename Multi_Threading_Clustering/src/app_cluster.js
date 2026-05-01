const cluster = require("cluster");
const os = require("os");
const express = require("express");

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // create worker process
  }

} else {
  const app = express();

  app.get("/", (req, res) => {
    res.send(`Handled by process ${process.pid}`);
  });

  app.listen(3000);
}