import express from "express"
import { middlewareCors } from "./middlewares/cors.js"
import tasksRouter from "./routes/tasks.js"
import notesRouter from "./routes/notes.js"
import { clerkMiddleware } from "@clerk/express"
import webhookRoutes from "./routes/webhook.js"
import cors from "cors"

const app = express()

// ========================
// 🔥 WEBHOOK (CLERK)
// ========================
app.use("/webhook", webhookRoutes)

// ========================
// 🌐 MIDDLEWARES GENERALES
// ========================
app.use(middlewareCors())
app.options("*", cors())
app.use(express.json())

// ========================
// 🔐 CLERK AUTH
// ========================
const isClerkConfigured = !!process.env.CLERK_SECRET_KEY

if (isClerkConfigured) {
  app.use(clerkMiddleware())
} else {
  console.warn("⚠️ Clerk no está configurado, auth desactivada")
}

// ========================
// 📦 ROUTES
// ========================
app.use("/tasks", tasksRouter)
app.use("/notes", notesRouter)

// ========================
// 🏠 HEALTH CHECK
// ========================
app.get("/", (req, res) => {
  return res.send("🔥 API OK")
})

export default app