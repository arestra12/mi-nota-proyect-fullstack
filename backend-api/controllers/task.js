import { TaskModels } from "../models/task.js"
import { getAuth } from "@clerk/express"

export class TaskControllers {

    static async getAll(request, response) {

        const { userId } = getAuth(request)

        if (!userId) {
            return response.status(401).json({"Error":"Unauthorized"})
        }


        const { limit, offset } = request.query

        const limitNum = limit ? Number(limit) : undefined
        const offsetNum = offset ? Number(offset) : undefined

        if (limit && isNaN(limitNum)) {
            return response.status(400).json({ error: "limit debe ser un valor numerico" })
        }

        if (offset && isNaN(offsetNum)) {
            return response.status(400).json({ error: "offset debe ser un valor numerico" })
        }

        const paginatedTask = await TaskModels.getAll({userId:userId, limit: limitNum, offset: offsetNum })
        /*
        Rompe tareas
        if (paginatedTask.length === 0) {
            return response.status(200).json({ message: "No se encontraron tareas" })
        }
        */

        return response.status(200).json(paginatedTask)
    }

    static async getById(request, response) {

        const { userId } = getAuth(request)
        
        if (!userId) {
            return response.status(401).json({"Error":"Unauthorized"})
        }



        const { id } = request.params

        const task = await TaskModels.getById(userId, id)

        if (!task) {
            return response.status(404).json({ error: "Task no encontrado" })
        }

        return response.status(200).json(task)
    }




    static async create(request, response) {


        const { userId } = getAuth(request)
        
        if (!userId) {
            return response.status(401).json({"Error":"Unauthorized"})
        }




        const { text } = request.body

        if (!text || text.trim() === "") {
            return response.status(400).json({ error: "Body incompleto" })
        }

        const newTask = await TaskModels.create({userId, text })

        return response.status(201).json({ message: "Nuevo task creado", task: newTask })
    }

    static async delete(request, response) {

        const { userId } = getAuth(request)
        
        if (!userId) {
            return response.status(401).json({"Error":"Unauthorized"})
        }




        const { id } = request.params

        const deleteTask = await TaskModels.delete(userId, id)

        if (!deleteTask) {
            return response.status(404).json({ error: "Task no encontrado" })
        }

        return response.status(200).json({ message: "Task eliminado correctamente" })
    }




    static async patch(request, response) {

        const { userId } = getAuth(request)
        
        if (!userId) {
            return response.status(401).json({"Error":"Unauthorized"})
        }




        const { text, completed } = request.body
        const { id } = request.params

        if (text === undefined && completed === undefined) {
            return response.status(400).json({ error: "Body incompleto" })
        }

        const updateTask = await TaskModels.patch({userId, text, completed, id })

        if (!updateTask) {
            return response.status(404).json({ error: "Task no encontrado" })
        }



        return response.status(200).json({ message: "Task actualizado correctamente", task: updateTask })
    }

}