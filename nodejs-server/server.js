const express = require('express');
const cors = require('cors');
const app = express();
global.app = app;
require('./routes');
require('./db');

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
