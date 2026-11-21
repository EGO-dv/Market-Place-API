const { createOrder, getOneOrder, getOrders, updateOrderStatus, deleteOrder } = require("../controller/orderController");

const router = require("express").Router();

router.post("/order/:customerId/:productId",createOrder)
router.get("/orders",getOrders)
router.get("/order/:orderId",getOneOrder)
router.patch("/order/:orderId",updateOrderStatus)
router.delete("/order/:id", deleteOrder)
module.exports = router;