const customerModel = require("../models/customerModel")

exports.createCustomer = async (req, res)=>{
    try{
        const customerProfile = {
    firstName: req.body.firstName,

    lastName: req.body.lastName,

    email: req.body.email, 

    phoneNumber: req.body.phoneNumber,

    address: req.body.address
        }
    const checkEmail = await customerModel.findOne({email: req.body.email})
    if(checkEmail){
        return res.status(500).json({
            message:"Email address already exists"
        })
    } 
    const data = await customerModel.create(customerProfile)
    res.status(201).json({
        message:"Customer profile created successfully",
        data
    })
}catch (error){
        res.status(500).json({
            message:"An error occurred",
            error:error.message})
    }
};

exports.getAllCustomers = async (req, res) =>{
    try{
        const data = await customerModel.find() 
        res.status(200).json({
            message:"Customers retrieved successfully",
            data
        })
    } catch (error){
        res.status(500).json({
            message:"An error occurred",
            error:error.message
        })
    }
};

exports.getCustomers = async (req, res) =>{
    try{
        const customerId = req.params.id
        const Customer = await customerModel.findById(customerId).populate("orderHistory", "product quantity orderDate orderCost")
        if(!Customer){
            return res.status(404).json({
                message:"Customer not found"
            })
        }
        res.status(200).json({
            message:"Customer Successfully retrieved",
            Customer
        })

    } catch (error){
          res.status(500).json({
            message:"An error occurred",
            error:error.message})

    }
};

exports.updateCustomer = async (req, res) =>{
    try{
    const customerId = req.params.customerId;
     const data = {
        email: req.body.email,

        phoneNumber: req.body.phoneNumber,

        address: req.body.address
        }
    const updatedCustomer = await customerModel.findByIdAndUpdate(customerId, data, {new:true})
    if(!updatedCustomer){
        return res.status(404).json({
            message:"Customer does not exist"
        })
    }
    res.status(200).json({
        message:"Customer profile updated successfully" 
    })
} catch (error){
    res.status(500).json({
        message:"An error occurred",
        error:error.message
    })
}
};


exports.deleteCustomer = async (req, res) =>{
    try{
        const customerId = req.params.customerId
        const deletedCustomer = await customerModel.findByIdAndDelete(customerId)
        if(!deletedCustomer){
            return res.status(404).json({
                message:"Customer does not exist"
            })
        }
        res.status(200).json({
            message:"Customer deleted successfully"
        })
    } catch (error){
        res.status(500).json({
            message:"An error occurred",
            error:error.message
        })
    }
};
 