const nodemailer = require('nodemailer');
const { options, getMaxListeners } = require('../app');
const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'devtannu62@gmail.com',
      pass: 'Developer@3',
    },
  });
  // 2) Define the email Options
  const mailOptions = {
    from: 'Tannu Rahman<devtannu62@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
