const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    firstName: {type: String,required: true},

    lastName: {type: String,required: true},

    email: {type: String,required: true, unique: true},

    phoneNumber: {type: String,required: true},

    address: {type: String,required: true},
    orderHistory:[{type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]
});

const customerModel = mongoose.model("Customer",customerSchema)

module.exports = customerModel