const express = require('express');
const router = express.Router();
const {
     getAllCategories ,
      getCategoryById ,
       newCategory ,
        deleteCategory,
        updateCategory
    } = require('../Controllers/categoryController')
const { isAuthenticatedUser , authorizeRoles} = require('../middlewares/auth')


//router.get(`/`, getAllCategories);
router.route('/').get(isAuthenticatedUser , authorizeRoles('admin'),getAllCategories)

//router.post('/new',newCategory);
router.route('/new').post(isAuthenticatedUser,authorizeRoles('admin'),newCategory)

//router.put('/:id', updateCategory);
router.route('/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateCategory)

//router.get('/:id',getCategoryById);
router.route('/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getCategoryById)

//router.delete('/:id', deleteCategory);
router.route('/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteCategory)

module.exports = router ;