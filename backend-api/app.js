import express from "express"
import { middlewareCors } from "./middlewares/cors.js"
import tasksRouter from "./routes/tasks.js"
import notesRouter from "./routes/notes.js"
import { clerkMiddleware } from '@clerk/express'
import webhookRoutes from "./routes/webhook.js"

const app =express()

//middlewares
app.use("/webhook", express.raw({ type: "application/json" })) //middleware
app.use("/webhook", webhookRoutes) //ruta

app.use(middlewareCors())

app.use(express.json())
const isClerkConfigured = !!process.env.CLERK_SECRET_KEY
if (isClerkConfigured) {
  app.use(clerkMiddleware())
} else {
  console.warn("⚠️ Clerk no está configurado, auth desactivada")
}

app.use("/tasks",tasksRouter)
app.use("/notes", notesRouter)

app.get("/",(request,response)=>{

    return response.send("🔥🔥🔥")

})



export default app