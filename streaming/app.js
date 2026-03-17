const express = require("express");
const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");
const cors = require("cors");

const app = express();
app.use(cors());
app.get("/video", (req, res) => {
  const videoPath = path.join(__dirname, "earth_rotation.mp4");
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;

  const range = req.headers.range;

  console.log(req.headers.range);

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");

    const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB

    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : Math.min(start + CHUNK_SIZE, fileSize - 1);

    // const start = parseInt(parts[0], 10);
    // const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;

    const file = fs.createReadStream(videoPath, { start, end });

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, headers);
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.post("/upload", (req, res) => {
  console.log('-----------Is server is Reached --------');
  // sample how the data will looks like without multer
  // req.pipe(fs.createWriteStream("./without/file.txt"));

  const busboy = Busboy({ headers: req.headers });

  busboy.on("file", (fieldname, file, filenameDetails) => {
    console.log('-------', filenameDetails)
    const writeStream = fs.createWriteStream(`./uploads/${filenameDetails.filename}`);
    file.pipe(writeStream);
  });

  busboy.on("finish", () => {
    res.end("Upload complete");
  });

  req.pipe(busboy);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
