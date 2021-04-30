 

const jwt = require('jsonwebtoken');
const user = require('../Models/user');
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");

// check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncError( async (req,res,next)=>{

    const {token} = req.cookies ;

    if (! token) {
        return next(new ErrorHandler('Login First to access this ressource ...' , 401))
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id)
    next()
})

// handling user roles
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this ressource `,403))
        }
        next()
    }
}

