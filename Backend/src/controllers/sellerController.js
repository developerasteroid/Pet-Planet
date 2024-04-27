const Seller = require('./../models/sellerModel');
const Product = require('./../models/productModel');
const Pet = require('./../models/petModel');
const Food = require('./../models/foodModel');
const Accessory = require('./../models/accessoryModel')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const mongoose = require('mongoose');

// Function to check if the file type is an image
const isImage = function (file) {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']; // Add more image types if needed
    return allowedImageTypes.includes(file.mimetype);
};


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/seller/product/'); // save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, 'IMG-' + uuidv4().replace(/-/g, '') + path.extname(file.originalname));
    }
});

// Create multer instance with the specified storage options and file filter
const uploadProductImage = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!isImage(file)) {
            const error = new Error('Only image files (.jpg, .jpeg, .png, .webp) are allowed!');
            error.statusCode = 400; // Set status code to 400 for Bad Request
            return cb(error);
        }
        cb(null, true);
    }
});

// Middleware to handle errors and send JSON response
const uploadErrorHandler = function(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        // Multer errors
        res.status(400).json({ message: err.message });
    } else {
        // Custom errors
        const statusCode = err.statusCode || 500; // Default to 500 Internal Server Error
        res.status(statusCode).json({ message: err.message || 'Internal Multer server error' });
    }
};

const DeleteFile = async(filePath) => {
    try {
        await fs.unlink(filePath);
        // File deleted successfully
        return true;
    } catch (error) {
        // An error occurred while deleting the file
        console.error('Error deleting file:', error);
        return false;
    }
};


const addPet = async(req, res) => {
    try {
        const photo = {
            filename: req.files['photo'] ? req.files['photo'][0].filename : null,
            path: req.files['photo'] ? req.files['photo'][0].path : null,
        }
        const certificatePhoto = {
            filename: req.files['certificatePhoto'] ? req.files['certificatePhoto'][0].filename : null,
            path: req.files['certificatePhoto'] ? req.files['certificatePhoto'][0].path : null,
        }
        const fatherPhoto = {
            filename: req.files['fatherPhoto'] ? req.files['fatherPhoto'][0].filename : null,
            path: req.files['fatherPhoto'] ? req.files['fatherPhoto'][0].path : null,
        }
        const motherPhoto = {
            filename: req.files['motherPhoto'] ? req.files['motherPhoto'][0].filename : null,
            path: req.files['motherPhoto'] ? req.files['motherPhoto'][0].path : null,
        }




        

        const cleanUp = async() => {
            try{
                if(photo.path)
                    await DeleteFile(photo.path);
                if(certificatePhoto.path)
                    await DeleteFile(certificatePhoto.path);
                if(fatherPhoto.path)
                    await DeleteFile(fatherPhoto.path);
                if(motherPhoto.path)
                    await DeleteFile(motherPhoto.path);
            } catch (error) {
                console.error('Error in clean up (addPet):', error);
            }
        }
        
        
        const seller = req.params._id;
        const {name, price, quantity, weight, type, breed, dob, gender, height, width, length, certified} = req.body;
        const description = req.body.description ? req.body.description : null;
        const fatherDetail = req.body.fatherDetail ? req.body.fatherDetail : null;
        const motherDetail = req.body.motherDetail ? req.body.motherDetail : null;

        if(!name || !price || !quantity || !weight || !type || !breed || !dob || !gender || !height || !width || !length){
            await cleanUp();
            return res.status(400).json({message: 'Required fields are missing'});
        }
        
        if(!(certified=="true" || certified=="false")){
            await cleanUp();
            return res.status(400).json({message:'certified field is missing. Must be checked or unchecked(true or false).'});
        }
        if(!photo.path){
            await cleanUp();
            return res.status(400).json({message: 'Product photo is missing.'});
        }
        if(certified=="true"){
            if(!certificatePhoto.path){
                await cleanUp();
                return res.status(400).json({message: 'Certificate photo is missing.'});
            }
        }
        if(fatherDetail){
            if(!fatherPhoto.path){
                await cleanUp();
                return res.status(400).json({message: 'Father detail is given but Father photo is missing.'});
            }
        }
        if(motherDetail){
            if(!motherPhoto.path){
                await cleanUp();
                return res.status(400).json({message: 'Mother detail is given but Mother photo is missing.'});
            }
        }
        if(price < 0 || quantity < 0 || weight < 0 || height < 0 || width < 0 || length < 0){
            await cleanUp();
            return res.status(400).json({message: 'Invalid value provided.'});
        }

        let dateOfBirth = new Date(dob);
        const pet = new Pet({type, breed, dateOfBirth, gender, height, width, length, certified: (certified=="true"? true : false), certificatePhoto:certificatePhoto.filename, fatherPhoto:fatherPhoto.filename, motherPhoto:motherPhoto.filename, fatherDetail, motherDetail});
        await pet.save();
        const product = new Product({seller, name, category:'pet', informationId:pet._id, price, quantity, photo:photo.filename, weight, description});
        await product.save();
        return res.status(200).json({message:'Product added Successfully'});

    } catch (error) {
        console.error('Error in addPet:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const addFood = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Product photo is required' });
        }

        const seller = req.params._id;
        const {name, type, companyName, quantity, price, weight} = req.body;
        const description = req.body.description ? req.body.description : null;

        if(!name || !type || !companyName || !quantity || !price || !weight){
            await DeleteFile(req.file.path);
            return res.status(400).json({message: 'Required fields are missing'});
        }

        if(quantity < 0 || price < 0 || weight < 0){
            await DeleteFile(req.file.path);
            return res.status(400).json({message: 'Invalid values are provided'});
        }

        const food = new Food({type, companyName});
        await food.save();

        const product = new Product({seller, name, category:'food', informationId:food._id, price, quantity, photo:req.file.filename, weight, description});
        await product.save();

        return res.status(200).json({message:'Product added Successfully'});

    } catch (error) {
        console.error('Error in addFood:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}



const addAccessory = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Product photo is required' });
        }

        const seller = req.params._id;
        const {name, type, companyName, quantity, price, weight, length, width, height} = req.body;
        const description = req.body.description ? req.body.description : null;

        if(!name || !type || !companyName || !quantity || !price || !weight || !length || !width || !height){
            await DeleteFile(req.file.path);
            return res.status(400).json({message: 'Required fields are missing'});
        }

        if(quantity < 0 || price < 0 || weight < 0 || length < 0 || width < 0 || height < 0){
            await DeleteFile(req.file.path);
            return res.status(400).json({message: 'Invalid values are provided'});
        }

        const accessory = new Accessory({type, companyName, length, width, height});
        await accessory.save();

        const product = new Product({seller, name, category:'accessory', informationId:accessory._id, price, quantity, photo:req.file.filename, weight, description});
        await product.save();

        return res.status(200).json({message:'Product added Successfully'});

    } catch (error) {
        console.error('Error in addAccessory:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}




const getMyProducts = async(req, res) => {
    try {
        const seller = req.params._id;
        const products = await Product.find({seller});
        
        const data = [];
        for(const product of products){
            if(product.category == 'pet'){
                const info = await Pet.findById(product.informationId);
                data.push({
                    _id:product._id,
                    name:product.name,
                    category:product.category,
                    informationId:product.informationId,
                    price:product.price,
                    quantity:product.quantity,
                    photo:`${process.env.HOST}/image/product/${product.photo}`,
                    weight:product.weight,
                    description:product.description,
                    paymentOption:product.paymentOption,
                    createdAt:product.createdAt,
                    type:info.type,
                    breed:info.breed,
                    gender:info.gender
                })
            } else if(product.category == 'food'){
                const info = await Food.findById(product.informationId);
                data.push({
                    _id:product._id,
                    name:product.name,
                    category:product.category,
                    informationId:product.informationId,
                    price:product.price,
                    quantity:product.quantity,
                    photo:`${process.env.HOST}/image/product/${product.photo}`,
                    weight:product.weight,
                    description:product.description,
                    paymentOption:product.paymentOption,
                    createdAt:product.createdAt,
                    type:info.type,
                    companyName:info.companyName
                })
            } else if(product.category == 'accessory'){
                const info = await Accessory.findById(product.informationId);
                data.push({
                    _id:product._id,
                    name:product.name,
                    category:product.category,
                    informationId:product.informationId,
                    price:product.price,
                    quantity:product.quantity,
                    photo:`${process.env.HOST}/image/product/${product.photo}`,
                    weight:product.weight,
                    description:product.description,
                    paymentOption:product.paymentOption,
                    createdAt:product.createdAt,
                    type:info.type,
                    companyName:info.companyName
                })
            }
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error in getMyProducts:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const updateProduct = async(req, res) => {
    try {
        const seller = req.params._id;
        const {productId, quantity, price} = req.body;

        if(!productId){
            return res.status(400).json({ message: 'productId is missing' });
        }

        if(quantity == undefined){
            return res.status(400).json({ message: 'quantity is missing' });
        }
        if(price == undefined){
            return res.status(400).json({ message: 'price is missing' });
        }

        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({ message: 'Invalid product Id' });
        }

        if(quantity < 0 || price < 0){
            return res.status(400).json({ message: 'Invalid quantity or price value' });
        }

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ message: 'product does not exist' });
        }

        if(product.seller.toString() != seller.toString()){
            return res.status(403).json({ message: 'Cannot update. This product does not belongs to you' });
        }

        await Product.findByIdAndUpdate(productId, {quantity, price});

        return res.status(200).json({message:'Product updated Successfully'});
        
    } catch (error) {
        console.error('Error in updateProduct:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const deleteProduct = async(req, res) => {
    try {
        const seller = req.params._id;
        const {productId} = req.body;
        const filePath = 'src/uploads/seller/product/';

        if(!productId){
            return res.status(400).json({ message: 'productId is missing' });
        }

        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({ message: 'Invalid product Id' });
        }

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ message: 'product does not exist' });
        }

        if(product.seller.toString() != seller.toString()){
            return res.status(403).json({ message: 'Cannot delete. This product does not belongs to you' });
        }

        if(product.category == 'pet'){
            const pet = await Pet.findByIdAndDelete(product.informationId);
            if(pet){
                if(pet.certificatePhoto){
                    await DeleteFile(filePath + pet.certificatePhoto);
                }
                if(pet.fatherPhoto){
                    await DeleteFile(filePath + pet.fatherPhoto);
                }
                if(pet.motherPhoto){
                    await DeleteFile(filePath + pet.motherPhoto);
                }
            }
        }

        if(product.category == 'food'){
            await Food.findByIdAndDelete(product.informationId);
        }
        if(product.category == 'accessory'){
            await Accessory.findByIdAndDelete(product.informationId);
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(deletedProduct){
            await DeleteFile(filePath + deletedProduct.photo);
        }
        return res.status(200).json({message:'Product deleted Successfully'});

    } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}



module.exports = {uploadProductImage, uploadErrorHandler, addPet, addFood, addAccessory,getMyProducts, updateProduct, deleteProduct}