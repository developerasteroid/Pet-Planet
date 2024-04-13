const Seller = require('./../models/sellerModel');
const Product = require('./../models/productModel');
const Pet = require('./../models/petModel');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/seller/product/'); // save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, 'IMG-' + uuidv4().replace(/-/g, '') + path.extname(file.originalname));
    }
});

// Create multer instance with the specified storage options
const uploadProductImage = multer({ storage: storage });


const DeleteFile = async(filePath) => {
    try {
        await fs.unlink(filePath);
        // File deleted successfully
        return true;
    } catch (error) {
        // An error occurred while deleting the file
        console.error('Error deleting file(addPet):', error);
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

    } catch (error) {
        
    }
}



const addAccessory = async(req, res) => {
    try {

    } catch (error) {
        
    }
}




module.exports = {addPet, uploadProductImage}