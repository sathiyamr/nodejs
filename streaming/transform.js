const fs = require("fs");
const path = require("path");

const { Transform } = require("stream");

const inputFilePath = path.join(__dirname, "input.txt");
const readStream = fs.createReadStream(inputFilePath, "utf-8");

const outputFilePath = path.join(__dirname, "transformOut.txt");
const writeStream = fs.createWriteStream(outputFilePath);

// Transform stream to convert text to uppercase
// const upperCaseTransform = new Transform({
//   transform(chunk, encoding, callback) {
//     const upperChunk = chunk.toString().toUpperCase();
//     callback(null, upperChunk);
//   },
// });

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperChunk = chunk.toString().toUpperCase();
    this.push(upperChunk);
  },
});

readStream.pipe(upperCaseTransform).pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Data has been written");
});
