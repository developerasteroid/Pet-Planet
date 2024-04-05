const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
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
        require:true
    },
    pinCode:{
        type:String,
        require:true
    },
    landMark:{
        type:String,
        require:true
    },
    doorNumber:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    district:{
        type:String,
        require:true
    },
    taluk:{
        type:String,
        require:true
    },
    village: {
        type:String,
        required:true
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
customerSchema.pre('save', async function(next) {
    const customer = this;
    if (!customer.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(customer.password, salt);
        customer.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password during login
customerSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Customer', customerSchema);