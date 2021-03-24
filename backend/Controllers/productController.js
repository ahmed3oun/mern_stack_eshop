const Product = require('../Models/product')
const Category = require('../Models/category')
const mongoose = require('mongoose')
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError')

// create new product => /products/new 
exports.newProduct = catchAsyncErrors(async (req,res,next)=>{

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')


    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        rating : req.body.rating,
        stock: req.body.stock,
        numOfReviews : req.body.numOfReviews,
        description: req.body.description,
        category : category
    }) 
    res.status(201).json({
        success : true ,
        product
    }) 
})
// Get single product => products/:id

exports.getProductById = catchAsyncErrors (async function (req,res,next) {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product not found',404))
    }
    res.status(201).json({
        success : true ,
        product
    })
})

// Get all products => /products
exports.getAllProducts = catchAsyncErrors( async (req,res,next)=>{
    console.log("get all products api ...rs");
    const products = await Product.find()
    res.status(201).json({
        success : true,
        count : products.length ,
        products
    })
})

// Update product => products/:id

exports.updateProduct = catchAsyncErrors( async function (req,res,next) {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return next(new ErrorHandler('Product not found',404))
     }
    
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Invalid Category')

    let product = await Product.findByIdAndUpdate(req.params.id , {
            name: req.body.name,
            price: req.body.price,
            rating : req.body.rating,
            stock: req.body.stock,
            numOfReviews : req.body.numOfReviews,
            description: req.body.description,
            category : category
    },{
            new : true ,
            runValidators : true ,
            useFindAndModify : false    
    } ) 

    if (!product) {
        return next(new ErrorHandler('The product cannot be updated',500))
    }
    return res.status(200).json({
        success : true ,
        product
    })
})

// Delete product => products/:id

exports.deleteProduct = catchAsyncErrors( async function (req,res,next) {
    
    const product = await Product.findByIdAndDelete(req.params.id)
    if (product) {
        return res.status(200).json({
            success : true ,
            message : 'product was deleted successfully !!!'
        })
    } else {
        return next(new ErrorHandler('Product not found',404))
    }
})
