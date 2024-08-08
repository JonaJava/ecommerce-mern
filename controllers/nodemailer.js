const nodemailer = require("nodemailer")

const Mailgen = require("mailgen")

//https://ethereal.email/create
let nodeConfig = {
    host : "smtp.ethereal.email",
    port:587,
    secure:false,//true para 465
    auth:{
        user:"jonathanaraya3@gmail.com",
        pass:"Megaclave#1"
    }
    
}

const transporter = nodemailer.createTransport((nodeConfig))

const MailGenerator = new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:"https://mailgen.js/"
    }
})

const sendingMail = async (req,res) =>{
const {name,userEmail,text,subject} = req.body;
    
    //conectar smtp
    const transporter = await nodemailer.createTransport({
        host:"smtp.ethereal.email",
        port:587,
        secure:false,
        auth:{
            user:"dante.watsica@ethereal.email",
            pass:"3h6mPXhmT3NdSgnwCJ"
        }
    })
  const email ={
    body:{
        name:name,
        intro:text || "bienvenido a jonas",
        outro:"necesita ayuda? "
    }
  }

  var emailBody = MailGenerator.generate(email);
  const message = {
    from:"dante.watsica@ethereal.email",
    to:userEmail,
    subject: subject || "Registro exitoso",
    html:emailBody
  }

  transporter.sendMail(message)
  .then(()=>{
    return res.status(200).send({msg:"registro completado, revise su email para completar registro"})
  })
  .catch(error => res.status(500).send({error}))
   /*  const info = await  transporter.sendMail({
        from:"ADS",
        to:"bar@ex.cl",
        subject:"hola",
        text:"hola mund",
        html:"<b>holanda </b>"
    })
    res.send(info) */
}
module.exports = sendingMail