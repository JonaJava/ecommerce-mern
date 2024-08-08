const mongoose = require("mongoose");

const connectDB = (con) =>{
    return mongoose.connect(con).then(()=>{
        console.log("conexion exitosa a db");
    }).catch((err) => {
        console.log("error al conectar db:", err);
    })
}
module.exports = connectDB