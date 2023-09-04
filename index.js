const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 6969;

app.get('/', (req, res) => {
  res.send('Hola a mi server en express');
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
});

app.get('/products', (req, res) => {
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

app.get('/products/filter', (req, res) => {
  res.send('Yo soy filter');
});

app.get('/products/:id', (req, res) => {
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

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

app.listen(port, () => {
  console.log('Mi puerto' + port);
});
