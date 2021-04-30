const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword ,
    getUserProfileDetails ,
    updatePassword,
    updateProfile,
    updateUser,
    deleteUser,
    getAllUsers
} = require('../Controllers/authController')
const {
    isAuthenticatedUser ,
    authorizeRoles
} = require('../middlewares/auth')


router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/logout', logout)
router.route('/password/forgot').post(forgotPassword)// Problem of sendMail function
router.route('/me').get(isAuthenticatedUser,getUserProfileDetails)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser , updateProfile)
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers)
router.route('/admin/user/:id').
                    get(isAuthenticatedUser,authorizeRoles('admin'),getUserProfileDetails).
                    put(isAuthenticatedUser,authorizeRoles('admin'),updateUser).
                    delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)

module.exports = router ;