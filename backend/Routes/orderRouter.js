const express = require('express');
const router = express.Router()
const {
    newOrder, getOrderById, myOrders
} = require('../Controllers/orderController')
const{
    isAuthenticatedUser,
    authorizeRoles
} = require( '../middlewares/auth')

router.route('/new').post(isAuthenticatedUser,newOrder)
router.route('/:id').get(isAuthenticatedUser,getOrderById)
router.route('/all/me').get(isAuthenticatedUser,myOrders)