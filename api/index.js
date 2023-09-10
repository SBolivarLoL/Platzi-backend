import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routerApi from './routes/index.route.js';
import { errorHandler, logErrors, boomErrorHandler, validationErrorHandler } from './middlewares/errorHandler.js';

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
app.use(morgan('dev'));
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hola a mi server en express');
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(validationErrorHandler);

app.listen(port, () => {
  console.log('Mi puerto' + port);
});
