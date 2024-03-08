const express = require('express');
const path = require('path');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const orderRouter = require('./routes/order.routes');
const aboutRouter = require('./routes/about.routes');

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './templates'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());

app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/', orderRouter);
app.use('/', aboutRouter);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}, http://localhost:3000`);
});