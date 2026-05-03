import { Router } from "express"
import { TaskControllers } from "../controllers/task.js"
import { validateCreateTask,validatePatchTask } from "../middlewares/taskZod.js"



const tasksRouter=Router()



tasksRouter.get("/",TaskControllers.getAll)

tasksRouter.get("/:id",TaskControllers.getById)

tasksRouter.post("/",validateCreateTask ,TaskControllers.create)

tasksRouter.patch("/:id/soft-delete", TaskControllers.softDelete)

tasksRouter.delete("/", TaskControllers.deleteAll)

tasksRouter.patch("/:id",validatePatchTask,TaskControllers.patch)

export default tasksRouter