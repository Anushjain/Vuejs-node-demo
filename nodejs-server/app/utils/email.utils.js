const nodemailer = require('nodemailer');

/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @param {string} email Email
 *  @param {string} otp Otp token
**/
async function sendOTP(email, otp) {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'developanush@gmail.com',
      pass: 'Open@1998',
    },
  });
  let message = 'Hello,<br> Enter the OTP to verify your email.<br> <b>';
  message = message + otp + '</b>';
  const mailOptions = {
    to: email,
    subject: 'Please confirm your Email account',
    html: message,
  };

  try {
    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error) {
        throw error;
      } else {
        console.log('Message sent: ' + response.message);
      }
    });
  } catch (error) {
    throw error;
  }
}
const emailVerification = {
  sendOTP,
};

module.exports = {
  emailVerification,
};
