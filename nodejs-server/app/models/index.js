const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.dialect,
      operatorsAliases: false,

      pool: {
        max: process.env.max,
        min: process.env.min,
        acquire: process.env.acquire,
        idle: process.env.idle,
      },
    },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../features/auth/user.model')(sequelize, Sequelize);

module.exports = db;
