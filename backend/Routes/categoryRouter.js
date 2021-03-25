const express = require('express');
const router = express.Router();
const {
     getAllCategories ,
      getCategoryById ,
       newCategory ,
        deleteCategory,
        updateCategory
    } = require('../Controllers/categoryController')

router.get(`/`, getAllCategories);

router.post('/admin/new',newCategory);

router.put('/admin/:id', updateCategory);

router.get('/:id',getCategoryById);

router.delete('/admin/:id', deleteCategory);

module.exports = router ;