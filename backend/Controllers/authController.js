const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../Models/user')
const ErrorHandler = require('../utils/ErrorHandler')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')

// Register a user => auth/register
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
    sendToken(user , 200 , res)
}) 

// Login user => auth/login
exports.loginUser = catchAsyncError(async function (req,res,next) {
    const {email , password} = req.body 
    // check if user & password is entered by the user 
    if (! email || !password) {
        return next(new ErrorHandler('Please enter email & password',400))
    }

    //Finding user in the database
    const user = await User.findOne({email}).select('+password')

    if (!user) {
        return new ErrorHandler('Invalid mail or password',401)
    }
    // check if password is correct 
    const isPasswordMatched = await user.comparePassword(password)

    if (! isPasswordMatched) {
        return new ErrorHandler('Invalid mail or password',401)
    }

    sendToken(user , 200 , res)
})

// Forgot password => auth/password/forgot
exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
    const user = await User.findOne({ email : req.body.email })
    if (!user) {
        return next(new ErrorHandler('User not found with this email',404))
    }
    // Get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave : false })
    //create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/auth/password/reset/${resetToken}`
    const message = `Your password reset token is as follow : \n\n
                        ${resetUrl}\n\n
                        If you have not requested this email , then ignore it`

    try {
        await sendEmail({
            email : user.email,
            subject : 'ESHOP Password Recovery',
            message
        })
        console.log('after sendEmail function ... res.status(200).json ...');
        res.status(200).json({
            success: true ,
            message : `Email sent to : ${user.email}` 
        })
    } catch (error) {
        console.log('catch section in sendEmail function');
        user.resetPasswordToken = undefined ; 
        user.resetPasswordExpire = undefined ;
        await user.save({ validateBeforeSave : false })
        return next(new ErrorHandler(error.message , 500))
    }

})

//Get currently logged in user details => auth/me
exports.getUserProfileDetails = catchAsyncError(async (req , res , next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success : true ,
        user
    })
})

//update / change password => auth/password/update
exports.updatePassword = catchAsyncError(async (req , res , next)=>{
    const user = await User.findById(req.user.id).select('+password')

    // check previous user password 
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (! isPasswordMatched) {
        return next(new ErrorHandler('Old password is incorrect',400))
    }

    user.password = req.body.password 
    await user.save()

    sendToken(user,200,res)
})

// update user profile  => auth/me/update
exports.updateProfile = catchAsyncError( async (req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }
    //////////////////////////////////////
    ///////Update Avatar : TODO//////////
    /////////////////////////////////////
    const user = User.findByIdAndUpdate(req.user.id,newUserData,{
        new : true,
        runValidators : true ,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true
    })


})

// Logout user => auth/logout 
exports.logout = catchAsyncError(async (req,res,next)=>{
    res.cookie('token',null,{
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true ,
        message : 'logged out '
    })
    
})



// Admin Routes

//Get All users => auth/admin/users
exports.getAllUsers = catchAsyncError(async (req,res,next) => {
    const users = await User.find()

    res.status(200).json({
        success : true ,
        users 
    })
})

// Get user detail => auth/admin/user/:id
exports.getUserDetail = catchAsyncError(async (req,res,next)=> {
    
    const user = User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User does not found with id ${req.params.id}`,500))
    }

    res.status(200).json({
        success : true ,
        user
    })
})

// update user profile  => auth/admin/user/:id
exports.updateUser = catchAsyncError( async (req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }

    const user = User.findByIdAndUpdate(req.user.id,newUserData,{
        new : true,
        runValidators : true ,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true
    })
})

// Delete user   => auth/admin/user/:id
exports.deleteUser = catchAsyncError(async (req,res,next)=> {
    
    const user = User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User does not found with id ${req.params.id}`,500))
    }

    user.remove()
    // Remove avatar from cloudinary - TODO
    res.status(200).json({
        success : true 
    })
})


