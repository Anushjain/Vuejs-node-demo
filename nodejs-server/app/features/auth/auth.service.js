
const db = require('../../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {checkBlacklist} = require('../../utils/blacklist.utils');
const {emailVerification} = require('../../utils/email.utils');
const {otpVerification} = require('../../utils/otp.utils');
/**
 * @param {Object} body request body
**/
async function createUser(body) {
  const otp = otpVerification.createOtp(body.email);
  const user = await User.create({
    name: body.name,
    email: body.email,
    verified: false,
    password: bcrypt.hashSync(body.password, 8),

  });
  await emailVerification.sendOTP(user.email, otp);
  return 'Otp has been send to verify email';
}
/**
 * @param {Object} body request body
**/
async function loginUser(body) {
  const user = await User.findOne({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    throw new ErrorHandler(404, 'No Such User');
  }
  if (!user.verified) {
    throw new ErrorHandler(404, 'please verify before login');
  }


  const passwordIsValid = bcrypt.compareSync(
      body.password,
      user.password,
  );

  if (!passwordIsValid) {
    throw new ErrorHandler(404, 'Invalid Password');
  }

  const token = jwt.sign({id: user.id}, process.env.SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return {token, user};
}
/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @param {Object} token request token
**/
async function logoutUser(token) {
  const result = await checkBlacklist.verifyTokenInBlacklist(token);

  if (result.status === true) {
    await checkBlacklist.addTokenInBlacklist(token, result.val);
    return {message: 'Log out successful!'};
  } else {
    throw new Error('Logout Failed');
  }
}

/**
 * @param {Object} body request body
**/
async function verifyOtp(body) {
  const user = await User.findOne({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    throw new ErrorHandler(404, 'User not found');
  }

  const result = await otpVerification.verifyOtp(body.email, body.otp);
  console.log(result);
  if (result.status) {
    user.verified = true;
    await User.update(user.dataValues, {
      where: {id: user.id},
    });
  } else {
    throw new ErrorHandler(404, 'Invalid OTP');
  }


  const token = jwt.sign({id: user.id}, process.env.SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return {token, user};
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  verifyOtp,
};
