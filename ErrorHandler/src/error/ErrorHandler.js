const logger = require("../services/logger");

class ErrorHandler {
  async handleError(err, res = null) {
    await logger.logError(err);

    await sendMailToAdminIfCritical(err);
    await saveInOpsQueueIfCritical(err);

    if (res) {
      // API response
      res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Something went wrong",
      });
    }
  }

  isTrustedError(error) {
    if (error instanceof require("./AppError")) {
      return error.isOperational;
    }
    return false;
  }
}

const handler = new ErrorHandler();

module.exports = {
  handler,
};

/* ---------------- MOCK FUNCTIONS ---------------- */

async function sendMailToAdminIfCritical(err) {
  if (!err.isOperational) {
    console.log("📧 Sending email to admin:", err.message);
  }
}

async function saveInOpsQueueIfCritical(err) {
  if (!err.isOperational) {
    console.log("📥 Saving to Ops Queue:", err.message);
  }
}