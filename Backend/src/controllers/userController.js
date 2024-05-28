const Product = require('./../models/productModel');
const Pet = require('./../models/petModel');
const Food = require('./../models/foodModel');
const Accessory = require('./../models/accessoryModel');
const Cart = require('./../models/cartModel');
const CartItem = require('./../models/cartItemModel');
const Order = require('./../models/orderModel');
const mongoose = require('mongoose');



const getProducts = async(req, res) => {
    try {
        const data = [];
        if(req.params.category){
            const category = req.params.category;
            const products = await Product.find({category}).select("_id name category price quantity photo weight description seller").populate('seller');
            products.forEach((item)=>{
                if(!item.seller.isBlocked){
                    data.push({
                        id:item._id,
                        name:item.name,
                        category:item.category,
                        price:item.price,
                        quantity:item.quantity,
                        photo:`${process.env.HOST}/image/product/${item.photo}`,
                        weight:item.weight,
                        description:item.description
                    })
                }
            })
        } else {
            const products = await Product.find({}).select("_id name category price quantity photo weight description seller").populate('seller');
            products.forEach((item)=>{
                if(!item.seller.isBlocked){
                    data.push({
                        id:item._id,
                        name:item.name,
                        category:item.category,
                        price:item.price,
                        quantity:item.quantity,
                        photo:`${process.env.HOST}/image/product/${item.photo}`,
                        weight:item.weight,
                        description:item.description
                    })
                }

                
            })
        }
        return res.json(data);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const getProductInfo = async(req,res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: 'Product id is missing.'});
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'Invalid Product id.'});
        }
        const product = await Product.findById(id).populate('seller');
        if(!product){
            return res.status(404).json({message: 'Product not found'});    
        }
        if(product.seller.isBlocked){
            return res.status(404).json({message: 'Product not found: This product is no longer available as the seller has been blocked.'});    
        }
        const data = {
            id:product._id,
            name:product.name,
            category:product.category,
            price:product.price,
            quantity:product.quantity,
            photo:`${process.env.HOST}/image/product/${product.photo}`,
            weight:product.weight,
            description:product.description
        };
        if(product.category == 'pet'){
            const pet = await Pet.findById(product.informationId);
            if(!pet){
                console.log(`Error(getProductInfo) => Pet Information ID: ${product.informationId} | Product ID: ${product._id}`);
                return res.status(404).json({message: 'Product not found!!!'});    
            }
            data['type'] = pet.type;
            data['breed'] = pet.breed;
            data['dateOfBirth'] = pet.dateOfBirth;
            data['gender'] = pet.gender;
            data['height'] = pet.height;
            data['width'] = pet.width;
            data['length'] = pet.length;
            data['certified'] = pet.certified;
            data['certificatePhoto'] = `${process.env.HOST}/image/product/${pet.certificatePhoto}`;
            data['fatherPhoto'] = `${process.env.HOST}/image/product/${pet.fatherPhoto}`;
            data['motherPhoto'] = `${process.env.HOST}/image/product/${pet.motherPhoto}`;
            data['fatherDetail'] = pet.fatherDetail;
            data['motherDetail'] = pet.motherDetail;

        }
        if(product.category == 'food'){
            const food = await Food.findById(product.informationId);
            if(!food){
                console.log(`Error(getProductInfo) => Food Information ID: ${product.informationId} | Product ID: ${product._id}`);
                return res.status(404).json({message: 'Product not found!!!'});    
            }
            data['type'] = food.type;
            data['companyName'] = food.companyName;
        }
        if(product.category == 'accessory'){
            const accessory = await Accessory.findById(product.informationId);
            if(!accessory){
                console.log(`Error(getProductInfo) => Accessory Information ID: ${product.informationId} | Product ID: ${product._id}`);
                return res.status(404).json({message: 'Product not found!!!'});    
            }
            data['type'] = accessory.type;
            data['companyName'] = accessory.companyName;
            data['length'] = accessory.length;
            data['width'] = accessory.width;
            data['height'] = accessory.height;

        }
        
        return res.json(data);

    } catch (error) {
        console.error('Error in getProductInfo:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const addItemToCart = async(req, res) => {
    try {
        const {productId, quantity} = req.body;
        const userId = req.params._id;

        if(!productId){
            return res.status(400).json({message: 'Product id is missing.'});
        }
        if(!quantity){
            return res.status(400).json({message: 'quantity is missing.'});
        }
        if(isNaN(quantity)){
            return res.status(400).json({message: 'quantity must be integer.'});
        }
        if(quantity <= 0){
            return res.status(400).json({message: 'Invalid quantity.'});
        }

        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({message: 'Invalid Product id.'});
        }

        const product = await Product.findById(productId).populate('seller');
        if(!product){
            return res.status(404).json({message: 'Product not found'});    
        }
        if(product.seller.isBlocked){
            return res.status(404).json({message: 'Product not found: This product is no longer available as the seller has been blocked.'});    
        }


        let cart = await Cart.findOne({user:userId});
        if(!cart){
            cart = new Cart({user:userId, name:"main"});
            await cart.save();
        }
        let cartItem = await CartItem.findOneAndUpdate({cart:cart._id, product:product._id}, {$inc:{quantity:quantity}}, {new: true});
        if(!cartItem){
            cartItem = new CartItem({ cart:cart._id, product:product._id, quantity:quantity });
            await cartItem.save();
        }
        res.status(200).json({message: 'Item Added to the Cart'});
    } catch (error) {
        console.error('Error in addItemToCart:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const removeItemFromCart = async(req, res) => {
    try {
        const {productId, quantity} = req.body;
        const userId = req.params._id;

        if(!productId){
            return res.status(400).json({message: 'Product id is missing.'});
        }
        if(!quantity){
            return res.status(400).json({message: 'quantity is missing.'});
        }
        if(isNaN(quantity)){
            return res.status(400).json({message: 'quantity must be integer.'});
        }
        if(quantity <= 0){
            return res.status(400).json({message: 'Invalid quantity.'});
        }

        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({message: 'Invalid Product id.'});
        }

        


        const cart = await Cart.findOne({user:userId});
        if(!cart){
            return res.status(404).json({message: 'Cart not found'});
        }
        const cartItem = await CartItem.findOneAndUpdate({cart:cart._id, product:productId}, {$inc:{quantity:(quantity * -1)}}, {new: true});
        if(!cartItem){
            return res.status(404).json({message: 'Product not found in the cart.'});
        }
        if(cartItem.quantity <= 0){
            await CartItem.findByIdAndDelete(cartItem._id);
        }
        res.status(200).json({message: 'Item removed from the Cart'});
    } catch (error) {
        console.error('Error in removeItemFromCart:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const getCartItems = async(req, res) => {
    try {
        const userId =  req.params._id;
        const cart = await Cart.findOne({ user:userId });
        if(!cart){
            return res.json([]);
        }
        const cartItems = await CartItem.find({ cart:cart._id}).populate('product');
        let data = cartItems.map(cartItem => {
            if(cartItem.product != null){
                // Clone the cartItem object to avoid modifying the original
                const modifiedCartItem = { ...cartItem.toObject() };

                modifiedCartItem.totalPrice = cartItem.quantity * cartItem.product.price;
                modifiedCartItem.product.photo = `${process.env.HOST}/image/product/${cartItem.product.photo}`;

                // Remove unwanted fields
                delete modifiedCartItem.product.seller;
                delete modifiedCartItem.product.informationId;
                delete modifiedCartItem.product.paymentOption;
                delete modifiedCartItem.product.createdAt;
                delete modifiedCartItem.product.__v;
                return modifiedCartItem;
            } else {
                return null;
            }
        })
        data = data.filter((p)=> p != null);
        res.json(data);
    } catch (error) {
        console.error('Error in getCartItems:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}



const orderProduct = async(req, res) => {
    try {
        const userId = req.params._id
        const {productId, quantity, customerName, mobileNumber, email, address} = req.body;

        if(!productId){
            return res.status(400).json({message: 'Product id is missing.'});
        }
        if(!quantity){
            return res.status(400).json({message: 'quantity is missing.'});
        }
        if(!customerName){
            return res.status(400).json({message: 'Customer name is missing.'});
        }
        if(!mobileNumber){
            return res.status(400).json({message: 'Mobile Number is missing.'});
        }
        if(!email){
            return res.status(400).json({message: 'Email is missing.'});
        }
        if(!address){
            return res.status(400).json({message: 'Address is missing.'});
        }
        if(quantity < 1){
            return res.status(400).json({message: 'quantity should be greater then 0.'});
        }

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({message: 'Product does not exist.'});
        }
        let gender = null;
        let productType = null;
        let companyName = null;
        if(product.category == 'pet'){
            const pet = await Pet.findById(product.informationId);
            if(!pet){
                return res.status(404).json({message: 'Product does not exist.'});
            }
            gender = pet.gender;
            productType = pet.breed;
        } else if(product.category == 'food'){
            const food = await Food.findById(product.informationId);
            if(!food){
                return res.status(404).json({message: 'Product does not exist.'});
            }
            productType = food.type;
            companyName = food.companyName;
        } else if(product.category == 'accessory'){
            const accessory = await Accessory.findById(product.informationId);
            if(!accessory){
                return res.status(404).json({message: 'Product does not exist.'});
            }
            productType = accessory.type;
            companyName = accessory.companyName;
        }

        let totalAmount = quantity * product.price;
        const order = new Order({user: userId, customerName, customerNumber:mobileNumber, customerEmail: email, product: productId, seller: product.seller, productTitle: product.name, productCategory:product.category, photo:product.photo, gender, productType, companyName, quantity, weight: product.weight, totalAmount, paymentMode:"cash on delivery", address});
        await order.save();

        res.status(200).json({message:"product ordered successfully"});

    } catch (error){
        console.error('Error in orderProduct:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}




module.exports = {getProducts, getProductInfo, addItemToCart, removeItemFromCart, getCartItems, orderProduct};