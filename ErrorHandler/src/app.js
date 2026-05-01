const express = require("express");
const AppError = require("./error/AppError");
const errorManagement = require("./error/ErrorHandler");

const app = express();

app.use(express.json());

/* ---------------- ROUTES ---------------- */

// How it works
app.get("/v1/pages/how-it-works", (req, res, next) => {
  res.json({
    title: "How It Works",
    content: "This explains how the system works.",
  });
});

// About me
app.get("/v1/pages/about-me", (req, res, next) => {
  res.json({
    title: "About Me",
    content: "This is about the author.",
  });
});

// Contact us
app.get("/v1/pages/contact-us", (req, res, next) => {
  res.json({
    title: "Contact Us",
    email: "support@example.com",
  });
});

/* ---------------- Test Crash Scenario ---------------- */


app.get("/crash", (req, res) => {
  throw new Error("Catch within the express Unexpected crash");
});


/* ---------------- Test Crash Scenario for uncaught exception---------------- */


app.get("/crash-out-of-express", (req, res) => {
  setTimeout(() => {
  throw new Error("Outside Express 💥");
}, 1000);
});

/* ---------------- 404 HANDLER ---------------- */

app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

/* ---------------- ERROR MIDDLEWARE ---------------- */

app.use(async (err, req, res, next) => {
  console.log('----Crash error wont reach here')
  await errorManagement.handler.handleError(err, res);
});

/* ---------------- PROCESS LEVEL HANDLING ---------------- */

process.on("uncaughtException", async (error) => {
  await errorManagement.handler.handleError(error);

  if (!errorManagement.handler.isTrustedError(error)) {
    console.error("❌ Untrusted error. Shutting down...");
    process.exit(1);
  }
});

/* ---------------- SERVER ---------------- */

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});