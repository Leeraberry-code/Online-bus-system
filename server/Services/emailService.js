// nodemailer.config.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  // port: 2525,
  auth: {
    user: "tumelothinane13@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sender = {
  email: "tumelothinane13@gmail.com",
  name: "Bus System",
};

module.exports = { transporter, sender };