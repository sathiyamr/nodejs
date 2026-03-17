const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "earth_rotation.mp4");
const readStream = fs.createReadStream(inputFilePath);

const outputFilePath = path.join(__dirname, "earth_rotation_2.mp4");
const writeStream = fs.createWriteStream(outputFilePath);

// readStream.pipe(writeStream);

readStream.on("data", (chunk) => {
    writeStream.write(chunk);
});

// Using pipe() (Recommended way)

// pipe() automatically:

// Reads chunks from readStream

// Writes them to writeStream

// Handles backpressure

// Pauses reading when the write buffer is full

// Resumes when it drains

readStream.on("end", (chunk) => {
    console.log("Finished writing the file");
});


writeStream.on("finish", () => {
  process.stdout.write("finished writing \n")
});
