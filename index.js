const express = require('express');
const routerApi = require('./routes/index');
const app = express();
const port = 6969;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola a mi server en express');
});

routerApi(app);


app.listen(port, () => {
  console.log('Mi puerto' + port);
});
