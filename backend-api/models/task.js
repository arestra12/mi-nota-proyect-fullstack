import { prisma } from "../prisma/client.js"

export class TaskModels {

  static async getAll({ userId, limit, offset }) {
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

  static async softDelete(userId, id) {

    const updated = await prisma.task.updateMany({
      where: {
        id,
        userId,
        isDeleted: false // evita re-eliminar
      },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    })

    return updated.count > 0
  }






  static async deleteAll(userId) {

    const result = await prisma.task.deleteMany({
      where: {
        userId,
        isDeleted: true
      }
    })

    return result.count
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