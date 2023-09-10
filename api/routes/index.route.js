import { Router } from 'express';

import productsRouter from './products.route.js';
import usersRouter from './users.route.js';
import categoriesRouter from './categories.route.js';
import orderRouter from './orders.route.js';

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
}

export default routerApi;
