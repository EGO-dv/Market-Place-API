const productModel = require("../models/productModel");

exports.createProduct = async (req, res)=>{
    try{

        const products = {
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stockQuantity: req.body.stockQuantity
        }
        const checkProduct = await productModel.findOne({productName: req.body.productName})
         if(checkProduct){
            return res.status(400).json({
                message:"Product already Logged"
            })
        }
       const data =  await productModel.create(products)
       res.status(201).json({
            message:"Product created successfully",
            data:data
        })

    } catch(error){
        res.status(400).json({
            message:"An error occurred",
            error:error.message})
    }

};

exports.getAllProducts = async (req, res)=>{
    try{
        const data = await productModel.find()
        
        res.status(200).json({
            message:"Products retrieved successfully",
            data:data
        })
    } catch(error){
        res.status(500).json({
            message:"An error occurred",
            error:error.message})
    }
};

exports.updateProduct = async (req, res)=>{
    try{
        const data = {
            price: req.body.price,
            stockQuantity: req.body.stockQuantity
        }
        const productId = req.params.id;

        const productUpdate = await productModel.findByIdAndUpdate(productId, data, {new:true})
        res.status(200).json({
            message:"Product updated successfully",
            data:productUpdate
        })
    } catch(error){
        res.status(400).json({
            message:"An error occurred",
            error:error.message})
    }
};

exports.deleteProduct = async (req, res)=>{
    try{
        const productId = req.params.id;
        const productDelete = await productModel.findByIdAndDelete(productId)   
        res.status(200).json({
            message:"Product deleted successfully",
            data:productDelete
        })
    } catch(error){
        res.status(400).json({
            message:"An error occurred",
            error:error.message})
    }   
};
