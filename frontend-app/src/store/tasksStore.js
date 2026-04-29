import { create } from "zustand"
import { getTasks, createTask, deleteTaskApi, patchTask, patchState } from "../services/tasksServices"

export const tasksStore = create((set) => ({
    tasks: [],
    loading: false,
    error: null,
    fetchTasks: async () => {
        try {
            set({ error: null, loading: true })

            const data = await getTasks()

            set((state) => {
                // 🔥 EVITA re-render si es igual
                if (JSON.stringify(state.tasks) === JSON.stringify(data)) {
                    return { loading: false }
                }

                return { tasks: data, loading: false }
            })

        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },
    addTask: async (task) => {
        try {

            const taskAdd = await createTask(task)

            set((state) => ({ tasks: [taskAdd, ...state.tasks ] }))

        } catch (error) {
            set({ error: error.message })
        }



    },

    deleteTask: async (id) => {
        try {
            set({ error: null, loading: true })
            await deleteTaskApi(id)

            set((state) => ({ tasks: state.tasks.filter(t => t.id !== id), loading: false }))
        } catch (error) {

            set({ error: error.message, loading: false })

        }
    },

    updateTask: async (task) => {
        try {

            const taskUpdate = await patchTask(task)

            set((state) => ({
                tasks: state.tasks.map(t => {
                    if (t.id === taskUpdate.id) {
                        return { ...t, text: taskUpdate.text }
                    }
                    return t
                })
            }))



        } catch (error) {
            set({ error: error.message })
        }

    },
    updateState: async (task) => {
    // 🧠 guardar estado anterior (por si falla)
    let previousTasks

    set((state) => {
        previousTasks = state.tasks

        return {
            tasks: state.tasks.map(t => {
                if (t.id === task.id) {
                    return { ...t, completed: !t.completed } // 👈 cambio instantáneo
                }
                return t
            })
        }
    })

    try {
        await patchState(task) // 👈 backend en segundo plano
    } catch (error) {
        // ❌ rollback si falla
        set({ tasks: previousTasks, error: error.message })
    }
}



    /*
   
       updateState: async (task) => {
           try {
   
               const stateUpdate = await patchState(task)
   
               set((state) => ({
                   tasks: state.tasks.map(t => {
                       if (t.id === stateUpdate.id) {
   
                           return { ...t, completed: stateUpdate.completed }
                       }
                       return t
   
                   })
               }))
   
           } catch (error) {
               set({ error: error.message })
   
           }
   
       } */

}))