const express = require("express");
const { createUser, loginUser, logout,checkAuth } = require("../controllers/auth/auth");
const validateSchema = require("../middlewares/validatorSchema");
const { registerSchema, loginSchema } = require("../schemas/authSchema");
const authRequired = require("../middlewares/validateToken");


const router = express.Router(); //Router() ->objeto router

router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .post("/logout", logout) // posteo
  .get("/check",authRequired ,checkAuth)
module.exports = router;
