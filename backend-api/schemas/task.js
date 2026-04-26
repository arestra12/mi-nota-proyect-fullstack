import * as z from "zod"

export const taskSchema = z.object({
  text: z.string().min(1, "El texto es requerido"),
  completed: z.boolean().optional().default(false)
})

export function validateTask(input) {
  return taskSchema.safeParse(input)
}

export function validatePartialTask(input) {
  return taskSchema.partial().safeParse(input)
}