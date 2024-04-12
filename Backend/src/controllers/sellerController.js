const Seller = require('./../models/sellerModel');
const Product = require('./../models/productModel');
const Pet = require('./../models/petModel');
const multer = require('multer');
const path = require('path');


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/user/'); // save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // rename files to avoid conflicts
    }
});

// Create multer instance with the specified storage options
const upload = multer({ storage: storage });


const addPet = async(req, res) => {
    try {
        const sellerId = req.params._id;
        const {name, price, quantity, photo, weight, description, type, breed, dob, gender, height, width, length, certified, certificatePhoto, fatherPhoto, motherPhoto, fatherDetail, motherDetail} = req.body;

        if(!name || !price || !quantity || !weight || !description || !type || !breed || !dob || !gender){
            return res.status(400).json({message: 'Required fields are missing'});
        }
        if(!height || !width || !length){
            return res.status(400).json({message: 'Measurement fields are missing'});
        }
        if(!(certified==true || certified==false)){
            return res.status(400).json({message:'certified field is missing. Must be checked or unchecked(true or false).'});
        }
        if(certified){
            console.log(certificatePhoto);
        }
        
        return res.send('ok');

    } catch (error) {
        console.error('Error in addPet:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const addFood = async(req, res) => {
    try {

    } catch (error) {
        
    }
}



const addAccessory = async(req, res) => {
    try {

    } catch (error) {
        
    }
}


module.exports = {addPet}