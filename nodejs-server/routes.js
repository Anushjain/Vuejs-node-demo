const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const glob = require('glob');
const authJwt = require('./app/middleware');
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/user', authJwt.verifyToken, (req, res) => {
  res.status(200).send({message: 'Hello User'});
});

const indexFiles = glob.sync('./app/features' + '/**/*.routes.js');
indexFiles.forEach(function(file) {
  require(file)(app);
});
