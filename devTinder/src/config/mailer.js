require("dotenv").config()
const nodemailer = require("nodemailer");

console.log(process.env.SES_SMTP_PASSWORD)
const transporter = nodemailer.createTransport({
  host: "email-smtp.ap-south-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SES_SMTP_USERNAME,
    pass: process.env.SES_SMTP_PASSWORD,
  },
});

module.exports = transporter;