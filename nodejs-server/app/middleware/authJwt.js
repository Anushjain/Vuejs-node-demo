const jwt = require('jsonwebtoken');

const {checkBlacklist} = require('../utils/blacklist.utils');


verifyToken = async (req, res, next) => {
  const token = req.cookies.authToken;
  console.log('token', req.cookies);
  try {
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
  } catch (err) {
    console.error(err);
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
