//Requires
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require('cookie-parser')

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(bodyparser.json());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorMiddleware);


//Routes
const productRouter = require('./Routes/productRouter');
const categoryRouter = require('./Routes/categoryRouter');
const authRouter = require('./Routes/authRouter');
const orderRouter = require('./Routes/orderRouter');
//Routers
app.use('/products',productRouter);
app.use('/categories', categoryRouter);
app.use('/auth',authRouter);
app.use('/orders',orderRouter);



module.exports = app ;