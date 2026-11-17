const express = require("express")
const app = express()
const PORT = 2889
require("./db")
const productRouter = require("./routes/productsRouter")
const customerRouter = require("./routes/customerRouter")
const orderRouter = require("./routes/orderRouter")
app.use(express.json())
app.use(productRouter)
app.use(customerRouter)
app.use(orderRouter)

 




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})