import { validateTask,validatePartialTask } from "../schemas/task.js"

export function validateCreateTask(request, response, next) {
  const result = validateTask(request.body)

  if (!result.success) {
    return response.status(400).json({ error: result.error.format() })
  }

  request.body = result.data
  next()
}

export function validatePatchTask(request, response, next) {
  const result = validatePartialTask(request.body)

  if (!result.success) {
    return response.status(400).json({ error: result.error.format() })
  }

  request.body = result.data
  next()
}