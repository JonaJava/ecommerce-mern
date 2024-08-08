
const bcrypt = require("bcryptjs");
const { User } = require("../../Models/User");
const createAccessToken = require("../../libs/jwt");


exports.createUser = async (req, res) => {
  //const user = new User(req.body);
  const { password, email } = req.body; //desectructuro
  try {
    const existEmail = await User.findOne({ email });
    if (existEmail !== null) {
      return res.status(403).json({ msg: "Email se encuentra en uso, intente identificarse" });
    } else {
      if (password) {
        bcrypt
          .hash(password, 10) //salt numero de vueltas para genera una pass mas fuerte pero demora mas-- devuelve promesa
          .then(async (hashedPassword) => {
            //agregar hashedpassword
            const user = new User({
              password: hashedPassword,
              email,
            });
            doc = await user.save(); //cada await la funcion que lo contiene debe llevar un async
           console.log(doc)
            const token = await createAccessToken({id:doc.id,role:doc.role})
            res.cookie("token",token,{httpOnly:true, expires: new Date(Date.now()+3600000)})
            res
              .status(201)
              .json({
                message:"Usuario creado exitosamente",
                id: doc.id,
                email: doc.email,
                name: doc.name,
                role:doc.role,
                addresses: doc.addresses,
              }); // _id =id
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }

    /* const doc = await user.save();
     console.log(doc)
     res.status(201).json({id:doc.id,role:doc.role}) */
  } catch (e) {
    res.status(500).send({ message:e.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    //compare bcrypt encripta y compara el password hasheado ke tiene info extra,, mismo pass diferente hash
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
     return res.status(401).json({ message: "No se encuentra el email" });
    } 
    const isMatch = await bcrypt.compare(req.body.password,user.password)
    if(!isMatch) return res.status(400).json({message:"Credenciales incorrecta"});
    const token = await createAccessToken({id:user.id,role:user.role})

    res.cookie("token",token,{httpOnly:true, expires: new Date(Date.now()+3600000)})
    res.json({id:user.id,role:user.role})
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.logout = (req,res) =>{
  res.cookie('token',"", {expires:new Date(0)})
return res.sendStatus(200)
}

exports.checkAuth = async (req, res) =>{//si el usuario esta tokenizado permite ingreso
  if(req.user){
    res.json(req.user);
    //console.log(req.user)
  }else{
    res.sendStatus(401)//envio no autorizado
  }
}