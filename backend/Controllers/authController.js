const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../Models/user')
const ErrorHandler = require('../utils/ErrorHandler')

// Register a user => /register
exports.registerUser = catchAsyncError(async function (req,res,next) {
    const {
        name,
        email,
        password,
    } = req.body 

    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : 'avatars/kccvibpsuiusmwfepb3m',
            url : 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png'
        }
    })
    const token = user.getJwtToken();

    res.status(201).json({
        success : true , 
        token,
        user
    })
}) 