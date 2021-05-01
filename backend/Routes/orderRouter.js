const express = require('express');
const router = express.Router()
const {
    newOrder, getOrderById, myOrders, allOrders , updateOrder
} = require('../Controllers/orderController')
const{
    isAuthenticatedUser,
    authorizeRoles
} = require( '../middlewares/auth')

router.route('/new').post(isAuthenticatedUser,newOrder)
router.route('/:id').get(isAuthenticatedUser,getOrderById)
router.route('/all/me').get(isAuthenticatedUser,myOrders)
router.route('all/admin').get( isAuthenticatedUser,authorizeRoles('admin'),allOrders)
router.route('/admin/:id').put( isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
