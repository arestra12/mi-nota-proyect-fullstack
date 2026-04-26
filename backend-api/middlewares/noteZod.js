import { validateNote,validatePartialNote } from "../schemas/note.js"


export function validateCreateNote(request, response, next) {
  const result = validateNote(request.body)

  if (!result.success) {
    return response.status(400).json({ error: result.error.format() })
  }

  request.body = result.data
  next()
}

export function validatePatchNote(request, response, next) {
  const result = validatePartialNote(request.body)

  if (!result.success) {
    return response.status(400).json({ error: result.error.format() })
  }

  request.body = result.data
  next()
}