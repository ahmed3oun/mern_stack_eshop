const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword
} = require('../Controllers/authController')

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/logout', logout)
router.route('/password/forgot').post(forgotPassword)

    

module.exports = router ;