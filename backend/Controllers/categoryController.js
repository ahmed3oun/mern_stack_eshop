const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError')
const Category = require('../Models/category')
const mongoose = require('mongoose')

// Post new category => /categories/admin/new
exports.newCategory = catchAsyncErrors(async function (req,res,next) {

    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
} )

// GET single category  => /categories/:id
exports.getCategoryById = catchAsyncErrors( async function (req,res,next) {
      const category = await Category.findById(req.params.id);
      if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
})

//  Get all categories => /categories
exports.getAllCategories = catchAsyncErrors( async function (req , res , next){
    const categories = await Category.find();
    if (!categories) {
        res.status(500).json({
            message: 'The category with the given ID was not found.'
        })
    }
    res.status(200).send(categories);
} )

// Update category => /categories/admin/:id
exports.updateCategory = catchAsyncErrors( async function (req,res,next) {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return next(new ErrorHandler('Category not found',404))
     }

    let category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon ,
            color: req.body.color,
        },
        { new: true}
    )

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

// Delete category => /categories/admin/:id
exports.deleteCategory = catchAsyncErrors( async function (req,res,next) {
    const category = await Category.findByIdAndDelete(req.params.id)
    if(category) {
        return res.status(200).json({success: true, message: 'the category is deleted!'})
    } else {
        return res.status(404).json({success: false , message: "category not found!"})
    }
})