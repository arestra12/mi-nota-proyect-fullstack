import { create } from "zustand";
import {
  getNotesApi,
  getNoteApi,
  createNoteApi,
  deleteNoteApi,
  patchNoteApi
} from "../services/notesServices";

export const notesStore = create((set, get) => ({
  notes: [],
  note: null,
  loading: false,
  error: null,

  // 🆕 paginación
  offset: 0,
  limit: 10,
  hasMore: true,

  // 🔥 GET NOTES
  fetchNotes: async () => {
    const { offset, limit, notes, loading, hasMore, error } = get();

    if (loading || !hasMore || error) return;

    try {
      set({ error: null, loading: true });

      const data = await getNotesApi({ offset, limit });

      set({
        notes: [...notes, ...data],
        offset: offset + limit,
        hasMore: data.length === limit,
        loading: false
      });

    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // 🔥 GET NOTE
  fetchNote: async (id) => {
    try {
      set({ error: null, note: null ,loading: true  });

      const data = await getNoteApi(id);

      set({ note: data ,loading: false});

    } catch (error) {
      set({ error: error.message , loading: false });
    }
  },

  // 🔥 CREATE
  addNote: async (newNote) => {
    try {
      const data = await createNoteApi(newNote);

      set((state) => ({
        notes: [...state.notes, data]
      }));

    } catch (error) {
      set({ error: error.message });
    }
  },

  // 🔥 DELETE
  deleteNote: async (id) => {
    try {
      await deleteNoteApi(id);

      set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      }));

    } catch (error) {
      set({ error: error.message });
    }
  },

  // 🔥 UPDATE
  updateNote: async (updatedNote) => {

    try {
      const data = await patchNoteApi(updatedNote);

      set((state) => ({note: data, notes: state.notes.map(n => n.id === data.id ? data : n)}));

    } catch (error) {
      set({ error: error.message });
    }
  },

  // 🧼 CLEAR
  clearNote: () => {
    set({ note: null });
  }
}));