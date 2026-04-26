import { useEffect } from "react"
import { tasksStore } from "../store/tasksStore"

export const useTask = () => {

    const tasks = tasksStore(state => state.tasks)
    const fetchTasks = tasksStore(state => state.fetchTasks)

    useEffect(() => {
        fetchTasks()
    }, [])



    return {tasks}
}