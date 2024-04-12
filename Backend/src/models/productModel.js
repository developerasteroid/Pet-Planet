const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['pet', 'food', 'accessory'],
        required:true
    },
    informationId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        default:null
    },
    paymentOption:{
        type:String,
        enum:['online', 'cod', 'both'],
        default: 'online'
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);