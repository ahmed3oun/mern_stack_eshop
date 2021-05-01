const express = require('express')
const router = express.Router();

const { getAllProducts ,newProduct , getProductById , updateProduct , deleteProduct, createProductReview, getProductReviews, deleteReview} = require('../Controllers/productController')

const { isAuthenticatedUser , authorizeRoles} = require('../middlewares/auth')



router.get('/',getAllProducts );

router.get('/:id', getProductById);

router.route('/new').post(isAuthenticatedUser , authorizeRoles('admin') ,  newProduct)    

router.put('/:id',isAuthenticatedUser,authorizeRoles('admin'), updateProduct);

router.delete('/:id',isAuthenticatedUser,authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser,createProductReview)

router.route('reviews/:id').get(isAuthenticatedUser,getProductReviews)

router.route('reviews').delete(isAuthenticatedUser,deleteReview)

module.exports = router  ;