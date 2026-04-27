import cors from "cors"

export const middlewareCors = () => {
  const allowedOrigin = process.env.FRONTEND_URL

  return cors({
    origin: function (origin, callback) {
      // permitir requests sin origin (Postman, webhooks, server)
      if (!origin) return callback(null, true)

      if (origin === allowedOrigin) {
        return callback(null, true)
      }

      console.log("❌ Origin bloqueado:", origin)
      return callback(null, false)
    },

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: true
  })
}