const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt");
const readStream = fs.createReadStream(inputFilePath);

const outputFilePath = path.join(__dirname, "output.txt");
const writeStream = fs.createWriteStream(outputFilePath);

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Data has been written");
});
