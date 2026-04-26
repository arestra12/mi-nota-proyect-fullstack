import { getAuthToken } from "./authToken"

export const fetchWithAuth = async (
  url,
  { method = "GET", body } = {}
) => {

  const token = await getAuthToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || "Error en request")
  }

  return response.json()
}