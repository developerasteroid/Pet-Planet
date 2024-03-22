const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    shopName: {
        type:String,
        default:null
    },
    email: {
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    dateOfBirth: {
        type:String,
        required:true
    },
    mobileNumber: {
        type:String,
        required:true
    },
    profileImageUrl: {
        type:String,
        default:null
    },
    adharNumber: {
        type:String,
        required:true
    },
    bankAccountNumber: {
        type:String,
        required:true
    },
    isBlocked: {
        type:Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {timestamps:true});


// Hash the password before saving it to the database
sellerSchema.pre('save', async function(next) {
    const seller = this;
    if (!seller.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(seller.password, salt);
        seller.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Seller', sellerSchema);