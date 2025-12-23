const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the server!!!");
});

app.get("/test", (req, res) => {
  res.send("TEST path from the server!!!");
});

app.get("/home", (req, res) => {
  res.send("HOME path from the server!!!");
});


app.listen(3000, () => {
  console.log("My app server is listening port number 3000.....");
});
