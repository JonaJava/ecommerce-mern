const express = require('express');
const { fetchBrands, createBrand} = require ('../controllers/products/Brand')

const router = express.Router();

router.get("/brands",fetchBrands).post('/brands',createBrand)// retorno datos

module.exports =  router