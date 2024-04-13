const Product = require('./../models/productModel');
const mongoose = require('mongoose');



const getProducts = async(req, res) => {
    try {
        const data = [];
        if(req.params.category){
            const category = req.params.category;
            const products = await Product.find({category}).select("_id name category price quantity photo weight description");
            products.forEach((item)=>{
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
            })
        } else {
            const products = await Product.find({}).select("_id name category price quantity photo weight description");
            products.forEach((item)=>{
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
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});    
        }

        return res.json({
            id:product._id,
            name:product.name,
            category:product.category,
            price:product.price,
            quantity:product.quantity,
            photo:`${process.env.HOST}/image/product/${product.photo}`,
            weight:product.weight,
            description:product.description
        })

    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {getProducts, getProductInfo};