const express = require('express')
const router = express.Router();

const { getAllProducts ,newProduct , getProductById , updateProduct , deleteProduct} = require('../Controllers/productController')

router.post('admin/new',newProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('admin/:id', updateProduct);

router.delete('admin/:id', deleteProduct);

module.exports = router  ;