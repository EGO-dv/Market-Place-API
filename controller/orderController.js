const orderModel = require('../models/orderModel');
const customerModel = require("../models/customerModel")
const productModel =require("../models/productModel")

exports.createOrder = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const productId = req.params.productId;
        
        const checkCustomer = await customerModel.findById(customerId);

        if (!checkCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }
        
        const checkProduct = await productModel.findById(productId);

        if (!checkProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        const order = {
            customer: customerId,
            product: productId,
            quantity: req.body.quantity,
            orderStatus: req.body.orderStatus,
            orderDate: req.body.orderDate
        };

        const newOrder = await orderModel.create(order);

        checkCustomer.orderHistory.push(newOrder._id)
await checkCustomer.save()

        await newOrder.populate("customer", "firstName lastName");
        await newOrder.populate("product", "productName");
         res.status(201).json({
            message: "Order created successfully",
            data: newOrder
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    };
};

//when the company is doing accounts
exports.getOrders = async (req, res) => {
    try {
        const data = await orderModel.find()
            .populate("customer", "firstName lastName")
            .populate("product", "productName");

        res.status(200).json({
            message: "Orders retrieved successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            message:"something went wrong",
            error:error.message
        });
    }
};

exports.getOneOrder = async(req, res)=>{
try {
    const order = req.params.orderId;
    const data = await orderModel.findById(order)
    .populate("customer", "firstName lastName address")
    .populate("product", "productName price")

    if (!data) {
        return res.status(404).json({
            message: "Order not found"
        });
    }
    res.status(200).json({
        message: "Order retrieved successfully",
        data
    });
} catch (error) {
    res.status(500).json({
        message: "An error occurred",
        error: error.message
    });
}     
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const data = {
            orderStatus: req.body.orderStatus
        }
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, data, { new: true });
        res.status(200).json({
            message: "Order status updated successfully",
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
};

exports.deleteOrder  = async(req,res)=>{
    try {
        const id = req.params.id
        const findOrder = await orderModel.findById(id)
        if(!findOrder){
            return res.status(404).json({
                message:"Order not found"
            })
        }

        await orderModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "Order succesfully deleted"
        })
    } catch (error) {
                res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
    }
