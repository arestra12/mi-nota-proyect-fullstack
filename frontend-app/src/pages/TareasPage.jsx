import React, { useEffect, memo } from 'react'
import Title from '../components/Title/Title'
import "./TareasPage.css"
import ListaTareas from '../components/ListaTareas/ListaTareas'
import Form from '../components/Form/Form'
import { useTask } from '../hooks/useTaks'
import { useTasksLogic } from '../hooks/useTasksLogic'
import { EstadoTareas } from '../components/ListaTareas/EstadoTareas'
import { ProgresoBar } from '../components/ListaTareas/ProgresoBar'

export const TareasPage = memo(() => {
  const { tasks } = useTask()
  const tasksData = useTasksLogic(tasks)

  return (

    <section className="tasks-tab">

      <Title title="Tareas" />

      <div className='header-layout'>

        <div className='header-1'>


          <h3 >
            Tareas totales: {tasks.length}
          </h3>
        </div>

        <div className='header-2'>

          <EstadoTareas tasksData={tasksData} />
          {/* botón ocultar completadas */}
        </div>

      </div>

      <div className='task-layout'>
        <div className='section-form'>

          <ListaTareas {...tasksData} />
        </div>


        <div className='section-list'>

          <Form />


        </div>
      </div>


      <div className='task-progress' >

        <ProgresoBar tasks={tasks}></ProgresoBar>
      </div>

    </section>



  )
})
