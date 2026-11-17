const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName: {type: String, required: true},

    description: {type: String, required: true},

    price: {type: Number, required: true},

    category: {type: String, required: true},

    stockQuantity: {type: Number, required: true, max: 2000, min:1}
})

const productModel = mongoose.model("Product",productSchema)

module.exports = productModel;