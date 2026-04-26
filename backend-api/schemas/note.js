import * as z from "zod"

export const noteSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  content: z.string().min(1, "El contenido es requerido"),
  pinned: z.boolean().default(false),
  pet: z.number().int("pet debe ser entero"),

  tags: z.array(z.string()).default([])
})

export function validateNote(input) {
  return noteSchema.safeParse(input)
}

export function validatePartialNote(input) {
  return noteSchema.partial().safeParse(input)
}