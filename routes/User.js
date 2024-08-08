const express = require('express');
const { updateUser, fetchUserById } = require('../controllers/user/User');
const authRequired = require('../middlewares/validateToken')
const router = express.Router();

router.get("/own",authRequired ,fetchUserById)
.patch('/:id',updateUser)//creo retorno datos

module.exports =  router