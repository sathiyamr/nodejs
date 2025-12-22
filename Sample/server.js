const http = require("node:http");

const server = http.createServer(function (req, res) {
  if (req.url === "/getSecretData") {
    res.end("No Secret Data available");
    return;
  }
  res.end("Default Response: Hi all");
});

server.listen(3000);
