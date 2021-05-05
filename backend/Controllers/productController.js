const Product = require('../Models/product')
const Category = require('../Models/category')
const mongoose = require('mongoose')
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

// create new product => /products/new 
exports.newProduct = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        rating : req.body.rating,
        stock: req.body.stock,
        numOfReviews : req.body.numOfReviews,
        description: req.body.description,
        user : req.body.user,
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

// Get all products => /products?keyword=example&... || /products
exports.getAllProducts = catchAsyncErrors( async (req,res,next)=>{

    const resPerPage = 4 ;
    const productsCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find() , req.query).search().filter().pagination(resPerPage)

    const products = await apiFeatures.query 
    res.status(201).json({
        success : true,
        productsCount,
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

// Create Product Review => products/review
exports.createProductReview = catchAsyncErrors(async function (req,res,next) {
    const {rating , comment , productId} = req.body 
    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    const isReviewed = await Product.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(
            review => {
                if (review.user.toString() === req.user._id.toString()) {
                    review.comment = comment
                    review.rating = rating 
                }
            }
        )
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length 
    }
    product.ratings = product.reviews.reduce((acc,item)=> item.rating + acc,0) / product.reviews.length
    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success : true ,
    })

})

// Get Product Reviews => products/reviews/:id
exports.getProductReviews = catchAsyncErrors(async function (req,res,next) {
    const product = await Product.findById(req.params.id)

    res.status(200).json({
        success : true ,
        reviews : product.reviews
    })
})

// Delete Product Reviews => products/reviews
exports.deleteReview = catchAsyncErrors(async function (req,res,next) {
    const product = await Product.findById(req.query.productId)
    const reviews = product.reviews.filter( review => review._id.toString() !== req.query.id.toString())
    const numOfReviews = reviews.length

    const ratings = product.reviews.reduce((acc,item)=>item.rating + acc , 0 ) / numOfReviews

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new : true ,
        runValidators : true ,
        useFindAndModify : false
    })


    res.status(200).json({
        success : true ,
        reviews : product.reviews
    })

    
})