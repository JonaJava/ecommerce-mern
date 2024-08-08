const express = require('express')
const{createOrder,fetchOrdersByUser, deleteOrder, updateOrder, fetchAllOrders,createPreference} = require('../controllers/Order/Order')
const authRequired = require("../middlewares/validateToken");


const router = express.Router();
//comillas simples
router.post('/',createOrder)
.post('/preference',createPreference)
.get('/own',authRequired,fetchOrdersByUser)
.delete('/:id', deleteOrder)
.patch('/:id', updateOrder)
.get('/allOrders', fetchAllOrders)


module.exports =  router