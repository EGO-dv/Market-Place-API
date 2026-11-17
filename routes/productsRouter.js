const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controller/productController');

const router = require('express').Router();


router.post("/product",createProduct);
router.get("/products",getAllProducts);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id",deleteProduct);

module.exports = router;