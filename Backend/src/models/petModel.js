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
    dateOfBirth:{
        type:Date,
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
    certified:{
        type:Boolean,
        default:false
    },
    certificatePhoto:{
        type:String,
        default:null
    },
    fatherPhoto:{
        type:String,
        default:null
    },
    motherPhoto:{
        type:String,
        default:null
    },
    fatherDetail:{
        type:String,
        default:null
    },
    motherDetail:{
        type:String,
        default:null
    },

    
});

module.exports = mongoose.model('Pet', petSchema);