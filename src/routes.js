import { Router } from "express";
import SessionController from "./app/controllers/SessionController";
import TaskController from "./app/controllers/TaskController";
import UserController from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router()

routes.post('/user', UserController.store)
routes.put('/user/editar',authMiddleware, UserController.update)

routes.post('/task',authMiddleware, TaskController.store)
routes.get('/tasks',authMiddleware, TaskController.listAll)
routes.get('/tasks/false',authMiddleware, TaskController.listTaskCheckFalse)
routes.put('/task/finalizar/:task_id',authMiddleware, TaskController.update)
routes.delete('/task/deletar/:task_id',authMiddleware, TaskController.delete)

routes.post('/session', SessionController.store)

export default routes;