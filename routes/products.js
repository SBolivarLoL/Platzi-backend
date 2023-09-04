const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `product ${id}`,
    number: 11,
  });
});

// How to solve the issue of having an endpoint that collides with a similar one (/products/:id)
/*
app.get('/products/filter', (req,res) =>{
  res.send('Yo soy filter');
})

Solution is coding all specific endpoints before dynamic endpoints
Meaning that /products/filter should be coded before /products/:id
*/

router.post('/', (req,res) => {
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  })
})

module.exports = router;
