const mongoose = require('mongoose');

// Declare the Schema of the User model
const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    OTP : {
        type : Number,
    },
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
        }
    ],
    orders : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Orders',
        }
    ]
});

//Export the model
module.exports = mongoose.model('User', userSchema);