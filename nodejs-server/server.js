const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const cookieParser = require('cookie-parser');
const app = express();
global.app = app;
require('./routes');
require('./db');
app.use(cookieParser());
const corsOptions = {
  origin: 'http://127.0.0.1:8081',
};

app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(cors(corsOptions));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
