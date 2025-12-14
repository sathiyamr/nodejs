const crypto = require("node:crypto");

console.log("Hello World ");

var a = 100;
var b = 200;

// pbkdf2 => Password-Based Key Derivation Function 2

// Synchronous Function - Will block the main thread dont use it

setTimeout(() => {
  console.log("Hey call me immediately");
}, 0);

setTimeout(() => {
  console.log("Hey call me after 5 sec");
}, 5000);

crypto.pbkdf2Sync("password", "salt", 50000, 64, "sha512");

console.log("first key is generated");

crypto.pbkdf2("password", "salt", 50000, 64, "sha512", (err, key) => {
  console.log("Second Key is Generated");
});

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log("Output for Mutliplication Response", c);
