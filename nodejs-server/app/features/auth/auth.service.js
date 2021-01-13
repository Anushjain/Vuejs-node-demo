
const db = require('../../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {checkBlacklist} = require('../../utils/blacklist.utils');
const {emailVerification} = require('../../utils/email.utils');
/**
 * @param {Object} body request body
**/
async function createUser(body) {
  try {
    // const otp = Math.floor(100000 + Math.random() * 900000);
    const otp = 555500;
    const token = jwt.sign({otp: otp}, process.env.SECRET, {
      expiresIn: 300, // 5 mins
    });
    const user = await User.create({
      name: body.name,
      email: body.email,
      verified: false,
      password: bcrypt.hashSync(body.password, 8),
      otp: otp,
      token: token,

    });
    await emailVerification.sendOTP(user.email, otp);
    return 'Otp has been send to verify email';
  } catch (error) {
    throw error;
  }
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
    throw new Error('User Not found');
  }
  if (!user.verified) {
    throw new Error('User Not Verified');
  }


  const passwordIsValid = bcrypt.compareSync(
      body.password,
      user.password,
  );

  if (!passwordIsValid) {
    throw new Error('Invalid Password');
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
    throw new Error('User Not found');
  }


  jwt.verify(user.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      throw new Error('Invalid OTP');
    }

    user.otp = decoded.otp;
  });
  user.verified = true;

  await User.update(user.dataValues, {
    where: {id: user.id},
  });

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
