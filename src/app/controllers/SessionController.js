import Jwt from "jsonwebtoken";
import auth from "../../config/auth";
import User from "../models/User";
class SessionController{
    async store(req,res){
        const {email,password} = req.body

        const user = await User.findOne({where:{email}})

        if(!user){
            return res.status(400).json({error:"Email não já existe"})
        }

        if(!(await user.checkPassaword(password))){
            return res.status(400).json({error:"Senha incorreta"})
        }

        const {id, name} = user

        return res.json({
            user:{
                id,name,email
            },
            token: Jwt.sign({id}, auth.secret, {
                expiresIn: auth.expiresIn
            })
        })
    }
}

export default new SessionController()