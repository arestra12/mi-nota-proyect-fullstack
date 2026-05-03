import { useEffect } from "react"
import { tasksStore } from "../store/tasksStore"

export const useTask = () => {

    const tasks = tasksStore(state => state.tasks)
    const fetchTasks = tasksStore(state => state.fetchTasks)

    useEffect(() => {
        fetchTasks()
    }, [])

    // 🧠 separación de estado
    const activeTasks = tasks.filter(t => !t.isDeleted)
    const deletedTasks = tasks.filter(t => t.isDeleted)

    return {
        tasks,
        activeTasks,
        deletedTasks
    }
}