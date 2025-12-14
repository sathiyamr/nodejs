const fs = require("node:fs");
const a = 100;

setImmediate(() => console.log("SetImmediate"));

setTimeout(() => console.log("Time Expired"), 0);

Promise.resolve("Promise CB").then(console.log);

process.nextTick(() => {
  process.nextTick(() => console.log(" Inner Next Tick"));
  console.log(" Next Tick");
});

function printA() {
  console.log("a=", a);
}

printA();

console.log("Last line of the file.");
