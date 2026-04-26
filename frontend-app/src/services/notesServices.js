import { fetchWithAuth } from "./fetchWithAuth"

const API_URL = import.meta.env.VITE_API_URL

// 🔥 GET NOTES
export const getNotesApi = async ({ offset = 0, limit = 25 }) => {
  return fetchWithAuth(
    `${API_URL}/notes?offset=${offset}&limit=${limit}`
  )
}

// 🔥 GET NOTE
export const getNoteApi = async (id) => {
  return fetchWithAuth(`${API_URL}/notes/${id}`)
}


// 🔥 CREATE
export const createNoteApi = async (newNote) => {
  const data = await fetchWithAuth(`${API_URL}/notes`, {
    method: "POST",
    body: newNote
  })

  return data.note
}

// 🔥 DELETE
export const deleteNoteApi = async (id) => {
  return fetchWithAuth(`${API_URL}/notes/${id}`, {
    method: "DELETE"
  })
}


// 🔥 UPDATE
export const patchNoteApi = async (note) => {
  const data = await fetchWithAuth(`${API_URL}/notes/${note.id}`, {
    method: "PATCH",
    body: note
  })
  return data.note
}