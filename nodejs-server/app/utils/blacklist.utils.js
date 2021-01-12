const redis = require('redis');
const client = redis.createClient();

addTokenInBlacklist = (token, blacklist) => {
  try {
    tokenlist = JSON.parse(blacklist);
    tokenlist=tokenlist ?tokenlist :[];
    token_list.push(token);

    client.set('blacklist', JSON.stringify(tokenlist), redis.print);
  } catch (err) {
    throw err;
  }
};

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

            if (token_list.includes(token)) {
              // console.log('Blacklisted Token');
              status = false;
            } else {
              // console.log('Token not found in blacklist');
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
