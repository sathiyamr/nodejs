const { Transform } = require("stream");

class TransformCustom extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const text = chunk.toString();
    const toUpperCase = text.toUpperCase();
    this.push(toUpperCase);
    callback();
  }
}

const transformCustomInstance = new TransformCustom();
transformCustomInstance.write("hello world");

transformCustomInstance.on("data", (chunk) => {
  console.log("---------", chunk.toString());
});

// process.stdin.pipe(transformCustomInstance);
process.stdin.pipe(transformCustomInstance).pipe(process.stdout)