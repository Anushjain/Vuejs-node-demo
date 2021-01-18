const {verifySignUp} = require('../../middleware');
const controller = require('./auth.controller');

module.exports = function(app) {
  const errorHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((err) => {
          if (err.name === 'BadRequestError') {
            res.status(400).send({msg: err.message});
          } else {
            res.status(500).send({msg: 'Internal Server Error'});
          }
        });
  };
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
      errorHandler(controller.signup),
  );

  app.post('/api/auth/login', errorHandler(controller.login));
  app.post('/api/auth/verifyOtp', errorHandler(controller.verifyOtp));
  app.get('/api/auth/logout', errorHandler(controller.logout));
};
