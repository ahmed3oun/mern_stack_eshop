const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [false , 'Please enter the product name'],
        trim : true ,
        maxLength : [100 , 'Product name cannot exceed 100 characters']
    },
    price:{
        type : Number,
        required : [false , 'Please enter the product price'],
        maxLength : [5 , 'Product price cannot exceed 5 numbers'],
        default : 0.0
    },
    description :{
        type : String,
        required : [false , 'Please enter the product description'],
    },
    rating : {
        type : Number ,
        default : 0
    },
    images : [
        {
            public_id : {
                type : String ,
                required : true
            },
            url : {
                type : String ,
                required : true
            }
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:false
    },
    stock: {
        type: Number,
        required: [false,'Please enter the count in stock'],
        min: 0,
        max: 500,
        default : 0
    },
    seller : {
        type : String ,
        required : [false , 'Please enter the product seller']
    },
    numOfReviews : {
        type : Number ,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : 'User',
                required : [false,'Please must be authentifed']
            },
            name : {
                type : String ,
                required : false 
            },
            rating : {
                type : Number ,
                required : false 
            },
            comment : {
                type : String ,
                required : false 
            }
        }
    ],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [false,'Please must be authentifed']
    },
    createdAt : {
        type : Date ,
        default : Date.now()
    }
})
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


module.exports = mongoose.model('Product', productSchema);