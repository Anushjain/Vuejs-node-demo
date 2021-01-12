const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authJwt = require('./app/middleware');
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());
// simple route
app.use('*', (req, res, next) => {
  if (
    !req.originalUrl.endsWith('/signup') &&
      !req.originalUrl.endsWith('/login') &&
      req.originalUrl.startsWith('/api')
  ) {
    authJwt.verifyToken(req, res, next);
  } else return next();
});

require('./app/features/auth/auth.routes')(app);
