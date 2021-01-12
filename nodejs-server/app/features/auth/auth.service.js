
const db = require('../../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {checkBlacklist} = require('../../utils/blacklist.utils');
/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @param {Object} body request body
**/
async function createUser(body) {
  try {
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),

    });
    const token = jwt.sign({id: user.id}, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return {token, user};
  } catch (error) {
    throw error;
  }
}
/**
 * Perform an asynchronous HTTP (Ajax) request.
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

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
