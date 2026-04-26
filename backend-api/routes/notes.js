import { Router } from "express";
import { NoteControllers } from "../controllers/note.js";
import { validateCreateNote, validatePatchNote } from "../middlewares/noteZod.js";


const notesRouter=Router()



notesRouter.get("/",NoteControllers.getAll )

notesRouter.get("/:id" , NoteControllers.getById)

notesRouter.post("/",validateCreateNote , NoteControllers.create)

notesRouter.delete("/:id" ,NoteControllers.delete )

notesRouter.patch("/:id" ,validatePatchNote,NoteControllers.patch )

export default notesRouter
