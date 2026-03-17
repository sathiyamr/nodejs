const fs = require("fs");

const text = "Hello World";

// Convert string → bytes (Buffer)
const buffer = Buffer.from(text, "utf8");

console.log(buffer); 
// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>

// Write bytes to file
fs.writeFileSync("text.txt", buffer);