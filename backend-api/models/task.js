import { prisma } from "../prisma/client.js"

export class TaskModels {

  static async getAll({ userId, limit = 10, offset = 0 }) {
    return await prisma.task.findMany({
      where: { userId },
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" }
    })
  }

  static async getById(userId, id) {
    return await prisma.task.findFirst({
      where: {
        id,
        userId
      }
    })
  }

  static async create({ userId, text }) {
    return await prisma.task.create({
      data: {
        userId,
        text,
        completed: false
      }
    })
  }

  static async delete(userId, id) {
    const deleted = await prisma.task.deleteMany({
      where: { id, userId }
    })

    return deleted.count > 0
  }

  static async patch({ userId, id, text, completed }) {
    const updated = await prisma.task.updateMany({
      where: { id, userId },
      data: {
        ...(text !== undefined && { text }),
        ...(completed !== undefined && { completed })
      }
    })

    if (updated.count === 0) return false

    return await prisma.task.findFirst({
      where: { id, userId }
    })
  }
}