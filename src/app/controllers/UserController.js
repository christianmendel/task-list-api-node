import * as Yup from "yup";
import User from "../models/User";

class UserController{
    async store(req,res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:"Falha na validação"})
        }
        const userExist = await User.findOne({where: {email: req.body.email}})

        if(userExist){
            return res.status(400).json({error:"Email já existe"})
        }

        const {id, name, email} = await User.create(req.body)
        return res.json({id, name, email})
    }

    async update(req,res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            oldPassword: Yup.string().required().min(6),
            password: Yup.string().required().min(6).when('oldPassword', (oldPassword, field)=>{
                oldPassword ? field.required() : field
            }),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:"Falha na validação"})
        }

        const {email, oldPassword} = req.body

        const user = await User.findByPk(req.userId)

        if(email!== user.email){
            const userExist = await User.findOne({where: {email}})

            if(userExist){
                return res.status(400).json({error:"Email já existe"})
            }
        }

        if(oldPassword && !(await user.checkPassaword(oldPassword))){
            return res.status(400).json({error:"Senha incorreta"})
        }

        const {id,name} = await user.update(req.body)

        return res.json ({
            id,name
        })
    }
}

export default new UserController()