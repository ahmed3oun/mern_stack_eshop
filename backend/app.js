//Requires
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const errorMiddleware = require('./middlewares/errors');

//middleware
app.use(express.json());
app.use(bodyparser.json());
app.use(errorMiddleware);


//Routes
const productRouter = require('./Routes/productRouter');
const categoryRouter = require('./Routes/categoryRouter');
//Routers
app.use('/products',productRouter);
app.use('/categories', categoryRouter);




module.exports = app ;