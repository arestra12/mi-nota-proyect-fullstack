import cors from "cors"

const allowedOrigin = process.env.FRONTEND_URL

export const middlewareCors = () => {
  return cors({

    origin: (origin, callback) => {

      console.log("🔥 ORIGIN REAL:", origin)

      // permitir requests sin origin (Postman, server-to-server, clerk)
      if (!origin) {
        return callback(null, true)
      }

      // validar que exista FRONTEND_URL
      if (!allowedOrigin) {
        console.warn("⚠️ FRONTEND_URL no definido en env")
        return callback(null, true) // o false si quieres bloquear todo
      }

      // comparación estricta
      if (origin === allowedOrigin) {
        return callback(null, true)
      }

      return callback(new Error("Error Origin no permitido"))
    }
  })
}