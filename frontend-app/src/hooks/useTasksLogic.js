import { useSearchParams } from "react-router-dom"
import { tasksStore } from "../store/tasksStore"
import { useEffect, useMemo } from "react"


export const useTasksLogic = (activeTasks) => {

    const numPages = 5

    const [searchParams, setSearchParams] = useSearchParams()


    const obtenerEstado = searchParams.get("state") === "true"


    const obtenerPage = Number(searchParams.get("page"))

    const curremtPage = Number.isInteger(obtenerPage) && obtenerPage >= 1 ? obtenerPage : 1


    const safeTasks = useMemo(
        () => Array.isArray(activeTasks) ? activeTasks : [],
        [activeTasks]
    )

    const taskFilter = obtenerEstado ? safeTasks : safeTasks.filter(task => task.completed === false)


    const numPagination = Math.max(1, Math.ceil(taskFilter.length / numPages))

    const safePage = curremtPage > numPagination ? numPagination : curremtPage

    const maxVisible = 5

    let start = Math.max(1, safePage - Math.floor(maxVisible / 2))
    let end = start + maxVisible - 1

    if (end > numPagination) {
        end = numPagination
        start = Math.max(1, end - maxVisible + 1)
    }

    const numElements = Array.from({ length: end - start + 1 }, (_, i) => start + i)

    const elementsPerPage = taskFilter.slice((safePage - 1) * numPages, safePage * numPages)


    const setearPage = (newPage) => {

        const setear = new URLSearchParams(searchParams)
        setear.set("page", newPage.toString())

        setSearchParams(setear)

    }


    const selectPage = (e, newPage) => {
        e.preventDefault()
        setearPage(newPage)

    }

    const atrasPage = (e) => {
        e.preventDefault()
        if (safePage > 1) {
            setearPage(safePage - 1)
        }

    }

    const adelantePage = (e) => {
        e.preventDefault()
        if (safePage < numPagination) {
            setearPage(safePage + 1)
        }

    }

    const setearEstado = (e) => {
        e.preventDefault()
        const newEstado = !obtenerEstado

        const setear = new URLSearchParams(searchParams)
        setear.set("state", newEstado.toString())
        setear.set("page", 1)

        setSearchParams(setear)

    }

    return {
        obtenerEstado,
        numPagination,
        safePage,
        numElements,
        elementsPerPage,
        setearPage,
        selectPage,
        atrasPage,
        adelantePage,
        setearEstado,
    }
}