const nodemailer = require("nodemailer");

const sendEmail = async (to, pin) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Verification Pin",
    text: `Your verification pin is ${pin}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};

module.exports = sendEmail;
