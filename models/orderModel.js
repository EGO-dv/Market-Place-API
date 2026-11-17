const mongoose = require("mongoose")
const productModel = require("./productModel")


const orderSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    
    quantity: {type: Number, required: true},

    orderCost: {type: Number},

    orderStatus: {type: String},

    orderDate:{type:String,required:true}
});

orderSchema.pre("save", async function(next) {

    const product = await productModel.findOne({
        _id: this.product})
    this.orderCost = this.quantity * product.price
next
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;