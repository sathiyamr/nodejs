const { Duplex } = require("stream");

class ChatConnection extends Duplex {
  constructor() {
    super();
  }

  _write(chunk, encoding, callback) {
    const input = chunk.toString().trim();

    if (input === "1") {
      this.push("Option 1 selected: Hello user!\n");
    } else if (input === "2") {
      this.push(`Option 2 selected: Current time is ${new Date()}\n`);
    } else if (input === "3") {
      this.push("Option 3 selected: Goodbye!\n");
      this.push(null); // end stream
    } else {
      this.push("Invalid option. Choose 1, 2, or 3.\n");
    }

    callback();
  }

  _read(size) {}
}

const chat = new ChatConnection();

console.log("Choose an option:");
console.log("1 → Print Hello");
console.log("2 → Show current time");
console.log("3 → Exit");

// user input → duplex stream
process.stdin.on("data", (chunk) => {
  chat.write(chunk);
});

// duplex stream output → console
chat.on("data", (data) => {
  process.stdout.write(data);
});

chat.on("end", () => {
  console.log("Connection closed.");
  process.exit();
});