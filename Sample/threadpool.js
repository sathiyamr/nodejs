const crypto = require("node:crypto");

/*

set UV_THREADPOOL_SIZE=2
node threadpool.js

*/

crypto.pbkdf2("password", "salt", 500000, 64, "sha512", (err, key) => {
  console.log("No 1 - PWD Encryption");
});


crypto.pbkdf2("password", "salt", 500000, 64, "sha512", (err, key) => {
  console.log("No 2 - PWD Encryption");
});


crypto.pbkdf2("password", "salt", 500000, 64, "sha512", (err, key) => {
  console.log("No 3 - PWD Encryption");
});

crypto.pbkdf2("password", "salt", 500000, 64, "sha512", (err, key) => {
  console.log("No 4 - PWD Encryption");
});