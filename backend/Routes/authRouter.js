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

const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new ErrorHandler('Invalid Image Type',500);
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError,'public/uploads/users');
    },
    filename : (req,file,cb)=>{
        const filename = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null , `${filename}-${Date.now()}.${extension}`)
    }
})
const uploadOptions = multer({ storage : storage})


router.post('/register',uploadOptions.single('avatar') , registerUser);
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