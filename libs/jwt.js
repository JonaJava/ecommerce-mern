const jwt = require("jsonwebtoken");
const TOKEN_SECRET = require("../config")
//creo token
function  createAccessToken(payload){
return new Promise((resolve, reject)=> {//transformo a promesa para utilizar async await
    jwt.sign(
        payload,
        TOKEN_SECRET,
    {
        expiresIn:"1d",
    },
    (err, token) => {
        if(err) reject(err)
           resolve(token)
        });
});
}
module.exports = createAccessToken;


