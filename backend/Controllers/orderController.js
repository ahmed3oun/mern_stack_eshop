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

// get logged in user orders => /order/all/admin
exports.allOrders = catchAsyncErrors(async function (req,res,next) {
    const orders = await Order.find() ;
    let totalAmount = 0;
    orders.forEach(
        order => totalAmount += order.totalPrice
    )

    res.status(200).json({
        success : true ,
        totalAmount,
        orders
    })
})

// Update / Process orders - Admin => /order/admin/:id
exports.updateOrder = catchAsyncErrors(async function (req,res,next) {
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order',400))
    }

    order.orderItems.forEach(
        async item => {
            await updateStock(item.product , item.quantity)
        }
    )

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()
    await order.save()

    res.status(200).json({
        success : true ,
        order
    })
})

async function updateStock(productId , quantity) {
    const product = await Product.findById(productId)
    product.stock -= quantity 
    await product.save({validateBeforeSafe : false })
}