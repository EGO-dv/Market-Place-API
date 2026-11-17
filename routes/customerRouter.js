const { createCustomer, getCustomers, deleteCustomer, updateCustomer, getAllCustomers } = require("../controller/customerController");


const router = require("express").Router();

router.post("/customer",createCustomer)
router.get("/customers",getAllCustomers)
router.get("/customer/:id",getCustomers)
router.patch("/customer/:customerId",updateCustomer)
router.delete("/customer/:customerId",deleteCustomer)

module.exports = router;
