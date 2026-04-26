import { Router } from "express"
import { Webhook } from "svix"
import { prisma } from "../prisma/client.js"

const webhookRoutes = Router()

webhookRoutes.post("/clerk", async (req, res) => {
  try {
    const payload = req.body
    const headers = req.headers

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    const evt = wh.verify(payload, {
      "svix-id": headers["svix-id"],
      "svix-timestamp": headers["svix-timestamp"],
      "svix-signature": headers["svix-signature"]
    })

    const { type, data } = evt

    // 🟢 CREAR
    if (type === "user.created") {
      await prisma.user.create({
        data: {
          id: data.id, // 🔥 ahora ESTE es el id
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url
        }
      })
    }

    // 🟡 ACTUALIZAR
    if (type === "user.updated") {
      await prisma.user.update({
        where: { id: data.id }, // 🔥 antes clerkId
        data: {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url
        }
      })
    }

    // 🔴 ELIMINAR
    if (type === "user.deleted") {
      await prisma.user.delete({
        where: { id: data.id } // 🔥 antes clerkId
      })
    }

    return res.status(200).json({ ok: true })

  } catch (error) {
    console.error("Webhook error:", error.message, error)
    return res.status(400).json({ error: "Webhook error" })
  }
})

export default webhookRoutes