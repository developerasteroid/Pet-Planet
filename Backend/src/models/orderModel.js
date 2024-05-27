const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    customerNumber:{
        type:String,
        required:true
    },
    customerEmail:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',
        required:true
    },
    productTitle:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        enum:['pet', 'food', 'accessory'],
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:null
    },
    productType:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        default:null
    },
    quantity:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'cancelled', 'processing', 'out for delivery', 'delivered'],
        default:'pending'
    },
    otp:{
        type:String,
        default:null
    },
    orderDate:{
        type:Date,
        default:Date.now
    }
}, {versionKey:false});

module.exports = mongoose.model('Order', orderSchema);