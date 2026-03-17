const { Readable } = require("stream");

class CustomReadableStream extends Readable {
  constructor(options) {
    // super({...options, encoding: 'utf-8'}); // utf-8 -> converts buffer to string
    super({objectMode: true})
    this.maxNumber = 10;
    this.generatedNumbers = 0;
  }

  _read() {
    if (this.generatedNumbers >= this.maxNumber) {
      this.push(null);
      return;
    }

    const randomNumber = Math.random();
    const buffer = Buffer.from(randomNumber.toString());
    const readableString = buffer.toString('utf8');
    this.push({number: readableString, index: this.generatedNumbers});
    this.generatedNumbers++;
  }
}

const readStream = new CustomReadableStream();

readStream.on("data", (chunk) => {
    console.log("Recieved a chunk of data", chunk);
});

readStream.on("end", (chunk) => {
    console.log("Finished Reading the file");
});