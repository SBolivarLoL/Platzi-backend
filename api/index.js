const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const routerApi = require('./routes/index.route');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
  validationErrorHandler,
} = require('./middlewares/errorHandler');
const passport = require('passport');

dotenv.config();
const app = express();
const port = process.env.PORT || 6969;

const whitelist = ['http://localhost:6969', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not allowed'));
    }
  },
};

app.use(cors(options));
require('./utils/auth/index')
app.use(morgan('dev'));
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hola a mi server en express');
});

app.use(passport.initialize());
routerApi(app);
app.use(logErrors);
app.use(validationErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi puerto' + port);
});
