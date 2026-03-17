import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // IMPORTANT: must match multer field name

    try {
      setStatus("Uploading...");

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.text();
      setStatus(data);

    } catch (error) {
      console.error(error);
      setStatus("Upload failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>File Upload</h2>

      <input type="file" onChange={handleFileChange} />

      <br /><br />

      <button onClick={handleUpload}>
        Upload
      </button>

      <p>{status}</p>
    </div>
  );
}

export default FileUpload;