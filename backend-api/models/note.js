import { prisma } from "../prisma/client.js"

export class NoteModels {

  static async getAll(userId, offsetNum = 0, limitNum = 10) {
    return await prisma.note.findMany({
      where: { userId },
      skip: offsetNum,
      take: limitNum,
      orderBy: { createdAt: "desc" }
    })
  }

  static async getById(userId, id) {
    return await prisma.note.findFirst({
      where: {
        id,
        userId
      }
    })
  }
  
  static async create(userId, title, content, pinned, pet, tags) {
    
    return await prisma.note.create({
      data: {
        userId,
        title,
        content,
        pinned: pinned ?? false,
        tags: tags ?? [],
        pet
      }
    })
  }

  static async delete(userId, id) {
    const deleted = await prisma.note.deleteMany({
      where: {
        id,
        userId
      }
    })

    return deleted.count > 0
  }

  static async patch(userId, id, data) {
    // data = { title, content, pinned, tags, pet }

    const updated = await prisma.note.updateMany({
      where: { id, userId },
      data
    })

    if (updated.count === 0) return false

    return await prisma.note.findFirst({
      where: { id, userId }
    })
  }
}