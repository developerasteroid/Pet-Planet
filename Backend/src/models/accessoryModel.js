const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    length:{
        type:Number,
        required:true
    },
    width:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Accessory', accessorySchema);