const Seller = require('./../models/sellerModel');
const SellerEmailOtp = require('./../models/sellerEmailOtpModel');
const User = require('./../models/userModel');
const UserEmailOtp = require('./../models/userEmailOtpModel');
const nodemailer = require('nodemailer');
const dns = require('dns');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const sellerRigisterOtpExpireTime = 30 * 60 * 1000; // 30 minutes to milliseconds
const userRigisterOtpExpireTime = 30 * 60 * 1000; // 30 minutes to milliseconds

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

// transporter verification
transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Ready to send Email Messages: ${success}`);
    }
});


// Email syntax validation
const isValidEmail = (email) => {
    // Basic email format validation using regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



const SendMail = (from, to, subject, html) => {
     //Email Data
     const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };
    // Sending email
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
                // res.send('Email sent successfully');
            }
        });
    });

}



const SellerSendOtp = async(req, res) => {
    try {
        const {email} = req.body;

        if(!isValidEmail(email)){
            return res.status(400).json({message: 'Invalid Email Format'});
        }

        const domainExist = await new Promise((resolve, reject) => {
            // Get the domain of the email address
            const domain = email.split('@')[1];

            // DNS lookup to check if domain exists
            dns.resolve(domain, 'MX', (err, addresses) => {
                if (err || !addresses.length) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        })
        if(!domainExist){
            return res.status(400).json({message: 'Invalid Email Domain'});
        }

        //check if seller with the same email already exists
        let seller = await Seller.findOne({email});
        if (seller) {
            return res.status(400).json({message: 'Seller with this email already exists'});
        }

        await SellerEmailOtp.deleteMany({ email });


        const otpNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number

        const otp = `${otpNumber}`;
        
        


        const to = email;
        const subject = `Your Verification Code - ${otp}`;
        const html = `
        <div style="border:1px solid #000000; margin:10px; padding:10px; text-align:center;">
        <h2>Pet Planet</h2>
        <h4>Verify your email</h4>
        <hr/>
        <p>Use this code for setting up registration:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 30 Minutes</p>
        </div>
        `;
        SendMail(process.env.EMAIL, to, subject, html)
        .then(async(result) => {
            const sellerOtp = new SellerEmailOtp({email, otp});
            await sellerOtp.save();
            res.status(200).json({message: 'OTP sent to Email Successfully'});
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({message: 'Failed to send OTP'});
        });

        
    } catch (error) {
        console.error("Error in SellerSendOtp:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

const DeleteFile = (filePath) => {
    // Delete the file
    return new Promise((resolve) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
            // File deleted successfully, you can optionally send a success response to the client
        });
    })
}



const RegisterSeller = async(req, res) => {
    try {
        //Extract seller input from request body
        const {fullName, email, otp, dateOfBirth, mobileNumber, adharNumber, bankAccountNumber, password, acceptTerms} = req.body;
        let shopName = req.body.shopName;
        
        


        // Handle file upload
        if (!req.file) {
            return res.status(400).json({ message: 'Profile photo is required' });
        }

        const profilePhotoPath = req.file.path;
        const profileImageUrl = req.file.filename;
        


        if(acceptTerms != 'true'){
            await DeleteFile(profilePhotoPath);
            return res.status(400).json({message: 'Please accept the terms and conditions to proceed with registration.'});
        }
        //check does email exist in SellerEmailOtp collection
        let sellerOtpInfo = await SellerEmailOtp.findOne({email});
        if (!sellerOtpInfo) {
            await DeleteFile(profilePhotoPath);
            return res.status(400).json({message: 'Registration cannot proceed without OTP verification. Please send an OTP first.'});
        }
        //check if seller with the same email already exists
        let seller = await Seller.findOne({email});
        if (seller) {
            await DeleteFile(profilePhotoPath);
            return res.status(400).json({message: 'Seller with this email already exists'});
        }
        

        const currentTime = Date.now();
        const expiryTime = sellerOtpInfo.createdAt.getTime() + sellerRigisterOtpExpireTime;
        if(currentTime > expiryTime){
            await DeleteFile(profilePhotoPath);
            return res.status(400).json({message: 'OTP expired. Send a new OTP.'});
        }

        if(otp != sellerOtpInfo.otp){
            await DeleteFile(profilePhotoPath);
            return res.status(400).json({message: "The OTP you entered is incorrect. Please ensure you've entered the correct code sent to your email"});
        }

        if(shopName == ''){
            shopName = null;
        }
        const sellerSave = new Seller({fullName, shopName, email, password, dateOfBirth, mobileNumber, profileImageUrl, adharNumber, bankAccountNumber});
        await sellerSave.save();
    
        res.status(200).json({message: 'Success! Your registration is complete.'});
        
    } catch (error) {
        console.error("Error in RegisterSeller:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

const LoginSeller = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email){
            return res.status(400).json({message:"Email is Missing"});
        }
        if(!password){
            return res.status(400).json({message:"Password is Missing"});
        }

        // Find the seller by email
        const seller = await Seller.findOne({ email });

        if (!seller) {
            // Seller with the provided email does not exist
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await seller.comparePassword(password);

        if (!isPasswordValid) {
            // Password is incorrect
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (!seller.isApproved) {
            // Seller account is not yet approved, send 403 Forbidden status
            return res.status(403).json({ message: 'Seller account is not yet approved' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: seller._id, type: "seller" }, process.env.jwt_secret, { expiresIn: '2h' });

        res.json({token});
    } catch (error) {
        console.error("Error in LoginSeller:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

const AdminLogin = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email){
            return res.status(400).json({message:"Email is Missing"});
        }
        if(!password){
            return res.status(400).json({message:"Password is Missing"});
        }


        if(email != process.env.ADMIN_EMAIL){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        let isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: process.env.ADMIN_EMAIL, type: "admin" }, process.env.jwt_secret, { expiresIn: '2h' });

        res.json({token});
        
        
    } catch (error) {
        console.error("Error in AdminLogin:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

const UserSendOtp = async(req, res) => {
    try {
        const {email} = req.body;

        if(!isValidEmail(email)){
            return res.status(400).json({message: 'Invalid Email Format'});
        }

        const domainExist = await new Promise((resolve, reject) => {
            // Get the domain of the email address
            const domain = email.split('@')[1];

            // DNS lookup to check if domain exists
            dns.resolve(domain, 'MX', (err, addresses) => {
                if (err || !addresses.length) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        })
        if(!domainExist){
            return res.status(400).json({message: 'Invalid Email Domain'});
        }

        //check if user with the same email already exists
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: 'User with this email already exists'});
        }

        await UserEmailOtp.deleteMany({ email });


        const otpNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number

        const otp = `${otpNumber}`;
        
        


        const to = email;
        const subject = `Your Verification Code - ${otp}`;
        const html = `
        <div style="border:1px solid #000000; margin:10px; padding:10px; text-align:center;">
        <h2>Pet Planet</h2>
        <h4>Verify your email</h4>
        <hr/>
        <p>Use this code for setting up registration:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 30 Minutes</p>
        </div>
        `;
        SendMail(process.env.EMAIL, to, subject, html)
        .then(async(result) => {
            const userOtp = new UserEmailOtp({email, otp});
            await userOtp.save();
            res.status(200).json({message: 'OTP sent to Email Successfully'});
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({message: 'Failed to send OTP'});
        });

    } catch (error) {
        console.error("Error in userSendOtp:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

const RegisterUser = async(req, res) => {
    try {
        //Extract user input from request body
        const {fullName, email, otp, dateOfBirth, mobileNumber, password, place, pinCode,  landMark, doorNumber, state, district, taluk, village, acceptTerms} = req.body;
        
        


        let profileImageUrl = null;
        if (req.file) {
            profileImageUrl = req.file.filename;
        }


        const cleanup = async() => {
            if(req.file){
                await DeleteFile(req.file.path);
            }
        }

        if(!fullName){
            await cleanup();
            return res.status(400).json({message: 'Full name is required.'});
        }
        if(!email){
            await cleanup();
            return res.status(400).json({message: 'email is required.'});
        }
        if(!dateOfBirth){
            await cleanup();
            return res.status(400).json({message: 'date of birth is required.'});
        }
        if(!mobileNumber){
            await cleanup();
            return res.status(400).json({message: 'mobile number is required.'});
        }
        if(!password){
            await cleanup();
            return res.status(400).json({message: 'password is required.'});
        }
        
        


        if(acceptTerms != 'true'){
            await cleanup();
            return res.status(400).json({message: 'Please accept the terms and conditions to proceed with registration.'});
        }

        //check does email exist in UserEmailOtp collection
        let userOtpInfo = await UserEmailOtp.findOne({email});
        if (!userOtpInfo) {
            await cleanup();
            return res.status(400).json({message: 'Registration cannot proceed without OTP verification. Please send an OTP first.'});
        }
        //check if user with the same email already exists
        let user = await User.findOne({email});
        if (user) {
            await cleanup();
            return res.status(400).json({message: 'User with this email already exists'});
        }
        

        const currentTime = Date.now();
        const expiryTime = userOtpInfo.createdAt.getTime() + userRigisterOtpExpireTime;
        if(currentTime > expiryTime){
            await cleanup();
            return res.status(400).json({message: 'OTP expired. Send a new OTP.'});
        }

        if(otp != userOtpInfo.otp){
            await cleanup();
            return res.status(400).json({message: "The OTP you entered is incorrect. Please ensure you've entered the correct code sent to your email"});
        }

        
        const userSave = new User({fullName, email, password, dateOfBirth, mobileNumber, profileImageUrl, place, pinCode, landMark, doorNumber, state, district, taluk, village});
        await userSave.save();
    
        res.status(200).json({message: 'Success! Your registration is complete.'});
        
    } catch (error) {
        console.error("Error in RegisterUser:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

const LoginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email){
            return res.status(400).json({message:"Email is Missing"});
        }
        if(!password){
            return res.status(400).json({message:"Password is Missing"});
        }

        // Find the seller by email
        const user = await User.findOne({ email });

        if (!user) {
            // Seller with the provided email does not exist
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            // Password is incorrect
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id, type: "user" }, process.env.jwt_secret, { expiresIn: '28d' });

        res.json({token});


    } catch (error) {
        console.error("Error in LoginUser:" + error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}




module.exports = {RegisterSeller, SellerSendOtp, LoginSeller, AdminLogin, SendMail, UserSendOtp, RegisterUser, LoginUser};