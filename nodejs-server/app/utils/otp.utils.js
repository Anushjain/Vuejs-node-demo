const redis = require('redis');
const client = redis.createClient();

/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @param {string} email Email for creating redis mapping
**/

createOtp = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  setOtp(email, otp);
  return otp;
};

/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @param {string} email Email for creating redis mapping
 * @param {string} otp Otp token
**/
setOtp = (email, otp) => {
  try {
    client.set(email, otp);
    client.expire(email, 600);
  } catch (error) {
    throw error;
  }
};

/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @param {string} email Email for creating redis mapping
 * @param {string} otp Otp token
 * @return {Promise} for verfication
**/
verifyOtp = (email, otp) => {
  return new Promise(async (resolve, reject) => {
    client.get(email, (err, val) => {
      if (err) {
        reject(err);
      } else {
        let status = false;
        if (val) {
          if (val == otp) {
            status = true;
          } else {
            status = false;
          }
        }
        resolve({
          val: val,
          status: status,
        });
      }
    });
  });
};

const otpVerification = {
  createOtp,
  verifyOtp,
};

module.exports = {
  otpVerification,
};
