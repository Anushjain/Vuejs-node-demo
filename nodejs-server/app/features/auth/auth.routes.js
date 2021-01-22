const {verifySignUp} = require('../../middleware');
const controller = require('./auth.controller');
const {errorHandler} = require('./../../../helper/wrapper');

module.exports = function(app) {
  app.post(
      '/api/auth/signup',
      verifySignUp.checkDuplicateEmail,
      errorHandler(controller.signup),
  );

  app.post('/api/auth/login', errorHandler(controller.login));
  app.post('/api/auth/verifyOtp', errorHandler(controller.verifyOtp));
  app.get('/api/auth/logout', errorHandler(controller.logout));
};
