const Order = require('../Models/order')
const Product = require('../Models/product')

const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError')

// create new order  => /order/new
exports.newOrder = catchAsyncErrors(async function (req,res,next) {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }= req.body 

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt : Date.now(),
        user : req.user._id
    })

    res.status(200).json({
        success : true ,
        order
    })
})
// get single order => /order/:id
exports.getOrderById = catchAsyncErrors(async function (req,res,next) {
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(! order){
        return next(catchAsyncErrors('No order found with this ID'))
    }

    res.status(200).json({
        success : true ,
        order
    })
})

// get logged in user orders => /order/all/me
exports.myOrders = catchAsyncErrors(async function (req,res,next) {
    const orders = await Order.find({ user : req.user.id})

    res.status(200).json({
        success : true ,
        orders
    })
})