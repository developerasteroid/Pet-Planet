const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:['Dog', 'Cat'],
        required:true
    },
    breed:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:['male', 'female'],
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    width:{
        type:Number,
        required:true
    },
    length:{
        type:Number,
        required:true
    },
    
});

module.exports = mongoose.model('Pet', petSchema);