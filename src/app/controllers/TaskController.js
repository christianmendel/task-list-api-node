import * as Yup from "yup"
import Task from "../models/Task"

class TaskController{
    async listTaskCheckFalse(req,res){
        const task = await Task.findAll({where: { user_id: req.userId, check: false}})

        res.json(task)
    }

    async listAll(req,res){
        const task = await Task.findAll({where: { user_id: req.userId}})

        res.json(task)
    }

    async store(req,res){
        const schema = Yup.object().shape({
            task: Yup.string().required(),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:"Falha na validação!"})
        }

        const {task} = req.body 

        const taskCreate = await Task.create({
            user_id:req.userId,
            task,
            check: false
        })

        return res.json(taskCreate)
    }

    async update(req,res){
        const {task_id} = req.params

        const task = await Task.findByPk(task_id)

        if(!task){
            return res.status(400).json({error:"Tarefa não existe!"})
        }

        await task.update({check:true})
        
        return res.json(task)
    }

    async delete(req,res){
        const {task_id} = req.params

        const task = await Task.findByPk(task_id)

        if(!task){
            return res.status(400).json({error:"Tarefa não existe!"})
        }

        if(task.user_id !== req.userId){
            return res.status(400).json({error:"Tarefa não é sua"})
        }

        await task.destroy(task_id)

        return res.json({sucess: "Tarefa excluida"})
    }
}

export default new TaskController()