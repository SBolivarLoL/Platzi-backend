const express = require('express');

const productsRouter = require('./products.route');
const categoriesRouter = require('./categories.route');
const usersRouter = require('./users.route');
const orderRouter = require('./orders.route');
const customersRouter = require('./customers.route');
const authRouter = require('./auth.route');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
