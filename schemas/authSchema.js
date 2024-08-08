const z = require('zod')

const passwordValidation = new RegExp(
    /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
  );
const registerSchema = z.object({
    
    email: z.string({
        required_error:"Email es requerido"
    }).email({
        message:"Ingrese un email valido (example@example.cl)"
    }),
    password:z.string({
        required_error:"Contraseña requerida"
    
    })
     .regex(passwordValidation,{
        message:"Tu password debe contener al menos 8 caracter en total y un caracter  especial $%@..."
    }) 
})

const loginSchema = z.object({
   
    password:z.string({
        required_error:"Password es requerido"
    }).min(6,{
        message:"Contraseña debe contener minimo 6 caracteres"
    }),
    email: z.string({
        required_error:"Email es requerido"
    }).email({
        message:"Ingrese un email valido (example@example.cl)"
    }),
})

module.exports = {registerSchema ,loginSchema}
