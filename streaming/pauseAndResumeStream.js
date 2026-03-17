const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt");
const readStream = fs.createReadStream(inputFilePath);


readStream.on('data', (chunk) => {
    console.log("Reading Input Text File", chunk)
})

readStream.on("end", (chunk) => {
    console.log("Finished Reading the file");
});


readStream.on("error", (chunk) => {
    console.log("Finished Reading the file with error");
});

readStream.pause();

process.stdin.on("data",(inputFromUser) => {
    if(inputFromUser.toString().trim() === 'start-the-stream') {
    }
    console.log("User Input :::", inputFromUser.toString().trim())
    readStream.read();
})