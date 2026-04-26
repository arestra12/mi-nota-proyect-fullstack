import { Router } from "express"
import { TaskControllers } from "../controllers/task.js"
import { validateCreateTask,validatePatchTask } from "../middlewares/taskZod.js"



const tasksRouter=Router()



tasksRouter.get("/",TaskControllers.getAll)

tasksRouter.get("/:id",TaskControllers.getById)

tasksRouter.post("/",validateCreateTask ,TaskControllers.create)

tasksRouter.delete("/:id", TaskControllers.delete)

tasksRouter.patch("/:id",validatePatchTask,TaskControllers.patch)

export default tasksRouter