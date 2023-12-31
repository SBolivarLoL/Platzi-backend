const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

// How to solve the issue of having an endpoint that collides with a similar one (/products/:id)
/*
app.get('/products/filter', (req,res) =>{
  res.send('Yo soy filter');
})

Solution is coding all specific endpoints before dynamic endpoints
Meaning that /products/filter should be coded before /products/:id
*/

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPrduct = await service.create(body);
      res.status(201).json(newPrduct);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
