const jwt = require('jsonwebtoken');

const {checkBlacklist} = require('../utils/blacklist.utils');


verifyToken = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (
    req.originalUrl.endsWith('/signup') ||
    req.originalUrl.endsWith('/login') ||
    req.originalUrl.endsWith('/verifyOtp') ||
    !req.originalUrl.startsWith('/api')
  ) {
    next();
  }

  const token = req.cookies['authToken'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.userId = decoded.id;
  });

  const result = await checkBlacklist.verifyTokenInBlacklist(token);

  if (result.status === true) {
    next();

    return 'You can proceed!';
  } else {
    return res.status(401).send({
      message: 'Please log in again!',
    });
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
