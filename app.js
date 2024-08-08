require('dotenv').config();
const mongoose = require("mongoose");
const express  = require("express");
const app = express();
//const port = 8000;
const bodyParser = require("body-parser");
const cors = require ("cors");
const connectDB = require("./db/connection");
//const database = "mongodb+srv://jonajava:69E87YSPqm3lvIix@cluster0.qllezin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const cookieParser = require('cookie-parser');
const Product = require("./routes/Product")
const Brand = require("./routes/Brands")
const Category = require("./routes/Category")
const User = require('./routes/User')
const Auth = require('./routes/Auth')
const Cart = require('./routes/Cart')
const Orders = require('./routes/Order')
const path = require('path')


//funciona en toda la aplicacion
//middlewares
app.use(express.json());//convertido a json req.body
app.use(express.static(path.resolve(__dirname,'build')))
app.use(cookieParser());// se utiliza para analizar y manejar las cookies que se envían desde el cliente hasta el servidor.
app.use(bodyParser.json());
app.use(cors({
  origin:["ecommerce-mern-azure-phi.vercel.app"
  ],
  methods:["POST","GET"],
    exposedHeaders:['X-Total-Count'],
   
}));

app.use("/product", Product); 
 app.use("/brand",Brand);
app.use("/category", Category);
app.use("/user", User);
app.use("/cart", Cart);
 app.use("/orders",Orders);
app.use("/auth", Auth);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
});



  
  app.listen(process.env.PORT, () => {
    console.log('server started');
  });

connectDB(process.env.MONGODB_URL);//conexion a db 


