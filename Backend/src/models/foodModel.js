const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Food', foodSchema);