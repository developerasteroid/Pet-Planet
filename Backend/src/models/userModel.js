const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
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
    place:{
        type:String,
        default: null
    },
    pinCode:{
        type:String,
        default: null
    },
    landMark:{
        type:String,
        default: null
    },
    doorNumber:{
        type:String,
        default: null
    },
    state:{
        type:String,
        default: null
    },
    district:{
        type:String,
        default: null
    },
    taluk:{
        type:String,
        default: null
    },
    village: {
        type:String,
        default: null
    },
    bankAccountNumber: {
        type:String,
        default: null
    },
    isBlocked: {
        type:Boolean,
        default: false
    }
}, {timestamps:true});


// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema);