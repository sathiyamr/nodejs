const cron = require("node-cron");
const ConnectionRequest = require("../models/connectionRequest");
const { sendEmail } = require("../services/emailService");

// Runs every day at 11:00 AM
// 0 11 * * *
cron.schedule("* 11 * * *", async () => {
  try {
    console.log("✅ Cron job executed at 11 AM:", new Date());
    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
    }).populate("toUserId");


    const emails = pendingRequests.map((req) => req.toUserId.emailId);
    sendEmail(emails);
  } catch (err) {
  }
});
