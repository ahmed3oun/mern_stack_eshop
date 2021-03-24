//Requires
const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const errorMiddleware = require('./middlewares/errors')

//middleware
app.use(express.json());
app.use(bodyparser.json())
app.use(errorMiddleware)


//Routes
const productRouter = require('./Routes/productRouter');
//Routers
app.use('/products',productRouter);




module.exports = app ;