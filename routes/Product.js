const express = require('express');
const {createProduct, fetchAllProduct, fetchProductById, updateProduct} = require ('../controllers/products/Product')
const authRequired  = require("../middlewares/validateToken")
const router = express.Router();

router.post("/", createProduct)
        .get("/",authRequired,fetchAllProduct)//creo retorno datos
        .get('/:id',fetchProductById)
        .patch('/:id',updateProduct)
module.exports =  router