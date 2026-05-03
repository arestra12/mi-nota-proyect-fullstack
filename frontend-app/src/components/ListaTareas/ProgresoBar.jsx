import React from 'react'

export const ProgresoBar = ({ activeTasks }) => {

    const safeTasks = Array.isArray(activeTasks) ? activeTasks : []

    const total = safeTasks.length
    const completed = safeTasks.filter(t => t.completed).length
    const progress = total === 0 ? 0 : (completed / total) * 100

    return (
        <div className='section-progreso' >
            <h3>Progreso:</h3>
            <div className="progress-container">

                <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
        </div>

    )
}
