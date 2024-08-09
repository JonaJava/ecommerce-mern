const express = require ('express');
const { fetchCartByUser, addToCart, deleteFromCart, updateCart } = require('../controllers/cart/Cart');
const authRequired = require("../middlewares/validateToken");
const router = express.Router();

router.post("/",authRequired,addToCart)
.get("/",authRequired,fetchCartByUser)
.delete('/:id',deleteFromCart)
.patch('/:id',updateCart)


module.exports =  router