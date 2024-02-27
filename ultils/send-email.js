const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOption = {
      from: "godbeee@gmail.com",
      to: email,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOption);
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
