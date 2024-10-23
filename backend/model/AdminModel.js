const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    fullname : {
        type : String,
        trim : true,
        minlength : 3,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
    }]
});

module.exports = mongoose.model('Admin', adminSchema);