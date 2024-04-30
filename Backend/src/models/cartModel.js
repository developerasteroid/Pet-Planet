const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    }
}, {versionKey:false});

module.exports = mongoose.model('Cart', cartSchema);