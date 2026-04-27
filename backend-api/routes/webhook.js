import { Router } from "express"
import { Webhook } from "svix"
import { prisma } from "../prisma/client.js"

const webhookRoutes = Router()

webhookRoutes.post(
  "/clerk",
  async (req, res) => {
    try {
      const headers = req.headers

      // 🔥 Svix necesita RAW body en req.body
      const payload = req.body

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

      const evt = wh.verify(payload, {
        "svix-id": headers["svix-id"],
        "svix-timestamp": headers["svix-timestamp"],
        "svix-signature": headers["svix-signature"]
      })

      const { type, data } = evt

      // 🟢 CREATE USER
      if (type === "user.created") {
        await prisma.user.create({
          data: {
            id: data.id,
            email: data.email_addresses?.[0]?.email_address,
            name: `${data.first_name || ""} ${data.last_name || ""}`,
            imageUrl: data.image_url
          }
        })
      }

      // 🟡 UPDATE USER
      if (type === "user.updated") {
        await prisma.user.update({
          where: { id: data.id },
          data: {
            email: data.email_addresses?.[0]?.email_address,
            name: `${data.first_name || ""} ${data.last_name || ""}`,
            imageUrl: data.image_url
          }
        })
      }

      // 🔴 DELETE USER
      if (type === "user.deleted") {
        await prisma.user.delete({
          where: { id: data.id }
        })
      }

      return res.status(200).json({ ok: true })

    } catch (error) {
      console.error("Webhook error:", error)
      return res.status(200).json({ ok: false }) // 🔥 importante no romper webhook
    }
  }
)

export default webhookRoutes