const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt");
const readStream = fs.createReadStream(inputFilePath, "utf-8");

readStream.on("data", (chunk) => {
    console.log("Recieved a chunk of data", chunk);
});

readStream.on("end", (chunk) => {
    console.log("Finished Reading the file");
});


readStream.on("error", (chunk) => {
    console.log("Finished Reading the file with error");
});