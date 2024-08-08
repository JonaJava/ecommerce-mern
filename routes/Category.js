const express = require('express');
const {fetchCategories, createCategory} = require ('../controllers/products/Category')

const router = express.Router();

router.get("/categories",fetchCategories).post('/categories',createCategory)//creo retorno datos

module.exports =  router