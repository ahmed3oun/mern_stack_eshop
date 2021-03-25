const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false
    },
    color: { 
        type: String,
        required: false
    }
})


categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Category', categorySchema);