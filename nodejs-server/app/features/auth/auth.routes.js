const {verifySignUp} = require('../../middleware');
const controller = require('./auth.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post(
      '/api/auth/signup',
      verifySignUp.checkDuplicateEmail,
      controller.signup,
  );

  app.post('/api/auth/login', controller.login);
  app.post('/api/auth/verifyOtp', controller.verifyOtp);
  app.get('/api/auth/logout', controller.logout);
};
