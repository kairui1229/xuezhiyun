const jsonwebtoken = require("jsonwebtoken")
const secret = "ouyang"

const JWT = {
    generate(value,expires){
        return jsonwebtoken.sign(value,secret,{expiresIn:expires})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(e){
            return false
        }
    }
}


module.exports = JWT