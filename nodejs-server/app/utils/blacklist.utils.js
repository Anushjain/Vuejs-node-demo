const redis = require('redis');
const client = redis.createClient();

/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @param {string} token add token to blocklist
 * @param {string} blacklist Otp blocklist
**/
addTokenInBlacklist = (token, blacklist) => {
  try {
    tokenlist = JSON.parse(blacklist);
    tokenlist = tokenlist ? tokenlist : [];
    tokenlist.push(token);

    client.set('blacklist', JSON.stringify(tokenlist), redis.print);
  } catch (err) {
    throw err;
  }
};

/**
 * Perform an asynchronous HTTP (Ajax) request.
 * @param {string} token check token in blocklist
 * @return {Promise} for verfication
**/
verifyTokenInBlacklist = (token) => {
  return new Promise(async (resolve, reject) => {
    client.get('blacklist', (err, val) => {
      if (err) {
        reject(err);
      } else {
        let status = true;

        try {
          if (val) {
            tokenlist = JSON.parse(val);

            if (tokenlist.includes(token)) {
              status = false;
            } else {
              status = true;
            }
          }
        } catch (err) {
          reject(err);
        }

        resolve({
          val: val,
          status: status,
        });
      }
    });
  });
};

const checkBlacklist = {
  addTokenInBlacklist,
  verifyTokenInBlacklist,
};

module.exports = {
  checkBlacklist,
};
