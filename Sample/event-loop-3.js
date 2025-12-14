const fs = require("node:fs");
const a = 100;

setImmediate(() => console.log("SetImmediate"));

setTimeout(() => console.log("Time Expired"), 0);

Promise.resolve("Promise CB").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log(" 2nd timer"), 0);

  process.nextTick(() => console.log(" 2nd Next Tick"));

  setImmediate(() => console.log(" 2nd SetImmediate"));

  console.log(" file Reading CB");
});

process.nextTick(() => console.log("Next Tick"));

function printA() {
  console.log("a=", a);
}

printA();

console.log("Last line of the file.");
