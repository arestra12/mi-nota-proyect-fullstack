import { Router } from "express"
import { Webhook } from "svix"
import { prisma } from "../prisma/client.js"

const webhookRoutes = Router()

webhookRoutes.post(
  "/clerk",
  async (req, res) => {
    try {
      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

      const payload = req.body.toString() // 🔥 CLAVE EN VERCEL

      const evt = wh.verify(payload, {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      })

      const { type, data } = evt

      console.log("🔥 WEBHOOK:", type)

      if (type === "user.created") {
        await prisma.user.upsert({
          where: { id: data.id },
          update: {},
          create: {
            id: data.id,
            email: data.email_addresses?.[0]?.email_address,
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            imageUrl: data.image_url,
          },
        })
      }

      if (type === "user.updated") {
        await prisma.user.update({
          where: { id: data.id },
          data: {
            email: data.email_addresses?.[0]?.email_address,
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            imageUrl: data.image_url,
          },
        })
      }

      if (type === "user.deleted") {
        await prisma.user.delete({
          where: { id: data.id },
        })
      }

      return res.status(200).json({ ok: true })
    } catch (error) {
      console.error("🔥 Webhook error:", error)
      return res.status(400).json({ ok: false })
    }
  }
)

export default webhookRoutes