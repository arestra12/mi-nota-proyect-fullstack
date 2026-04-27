import { NoteModels } from "../models/note.js"
import { getAuth } from "@clerk/express"

export class NoteControllers {

    static async getAll(request, response) {

        console.log("HEADERS:", request.headers.authorization)
        

        const { userId } = getAuth(request)
        console.log("usuario llego::",userId)


        const { offset, limit } = request.query

        const offsetNum = offset ? Number(offset) : undefined
        const limitNum = limit ? Number(limit) : undefined


        if (offset && isNaN(offsetNum)) {
            return response.status(400).json({ error: "Error el offset debe ser numerico" })
        }


        if (limit && isNaN(limitNum)) {

            return response.status(400).json({ error: "Error el limit debe ser numerico" })

        }

        const paginated = await NoteModels.getAll(userId, offsetNum, limitNum)

        return response.status(200).json(paginated)


    }

    static async getById(request, response) {

        const { userId } = getAuth(request)

        const { id } = request.params

        const note = await NoteModels.getById(userId, id)



        if (!note) {
            return response.status(404).json({ error: "Nota no encontrada" })
        }

        return response.status(200).json(note)

    }

    static async create(request, response) {

        const { userId } = getAuth(request)

        console.log("usuario llego:",userId)



        const { title, content, pinned = false, pet } = request.body

        console.log("Mascota: ",pet)


        let tags = request.body.tags

        if (tags !== undefined) {

            if (!Array.isArray(tags)) {

                return response.status(400).json({ error: "tags debe ser un array" })
            }

            tags = [...new Set(tags)]

        }

        tags = tags ?? []

        if (!title || !content || title.trim() === "" || content.trim() === "") {
            return response.status(400).json({ error: "Falta el titulo o contenido" })

        }

        if (typeof pinned !== "boolean") {
            return response.status(400).json({ error: "pinned debe ser booleano" })


        }

        if (typeof pet !== "number") {
            return response.status(400).json({ error: "pet debe ser numerico" })

        }




        const newNote = await NoteModels.create(userId, title, content, pinned, pet, tags)

        return response.status(201).json({ message: "Nota creada con exito", note: newNote })



    }

    static async delete(request, response) {


        const { userId } = getAuth(request)




        const { id } = request.params

        const deleteNote = await NoteModels.delete(userId, id)

        if (!deleteNote) {

            return response.status(404).json({ error: "Nota no encontrada" })
        }

        return response.status(200).json({ message: "Nota eliminada con exito" })

    }


    static async patch(request, response) {


        const { userId } = getAuth(request)



        const { title, content, pet, pinned } = request.body
        const { id } = request.params
        let { tags } = request.body

        if (tags !== undefined) {

            if (!Array.isArray(tags)) {
                return response.status(400).json({ error: "tags debe ser un array" })
            }


            tags = tags.map(tag => tag.trim()).filter(tag => tag !== "")

            tags = [...new Set(tags)]
        }


        if (typeof pinned !== "boolean" && pinned !== undefined) {
            return response.status(400).json({ error: "pinned debe ser booleano" })


        }


        if (pet !== undefined && !Number.isInteger(pet)) {
            return response.status(400).json({ error: "pet debe ser un entero" })
        }


        const data = {
            ...(title !== undefined && { title }),
            ...(content !== undefined && { content }),
            ...(pet !== undefined && { pet }),
            ...(pinned !== undefined && { pinned }),
            ...(tags !== undefined && { tags })
        }





        const updateNote = await NoteModels.patch(userId, id, data)


        if (!updateNote) {

            return response.status(404).json({ error: "Nota no encontrada" })
        }



        return response.status(200).json({ message: "Nota actualizada con exito", note: updateNote })

    }








}