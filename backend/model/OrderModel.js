const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    products : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],
    date : {
        type : String,
    },
    price : {
        type : Number,
    },
    discountedPrice : {
        type : Number,
    },
    paymentStatus : {
        type : Boolean,
        default : false,
    },
    orderStatus : {
        type : Boolean,
        default : false,
    }
})

module.exports = mongoose.model('Orders', orderSchema);