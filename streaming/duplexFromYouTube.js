const { Duplex, PassThrough } = require("stream");
const { createReadStream, createWriteStream, read } = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt");
const readStream = createReadStream(inputFilePath);

const outputFilePath = path.join(__dirname, "output.txt");
const writeStream = createWriteStream(outputFilePath);

class Throttle extends Duplex {
  constructor(ms) {
    super();
    this.delay = ms;
  }

  _read() {}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);  
  }

  _final() {
    this.push(null);
  }
}

const report = new PassThrough();
const throttle = new Throttle(1000);

let total = 0;

report.on("data", (chunk) => {
  total += chunk.length;
  console.log("bytes", total);
});

readStream.pipe(throttle).pipe(report).pipe(writeStream);
