const fs = require("node:fs");

const a = 100;

setImmediate(() => console.log("SetImmediate"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("file Reading CB");
});

setTimeout(() => console.log("Time Expired"), 0);

function printA() {
  console.log("a=", a);
}

printA();

console.log("Last line of the file.");
