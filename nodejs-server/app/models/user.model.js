module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
    },

    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
    },
    otp: {
      type: Sequelize.STRING,
    },
    verified: {
      type: Sequelize.BOOLEAN,
    },
  });

  return User;
};
