import React, { useEffect, memo } from 'react'
import Title from '../components/Title/Title'
import "./TareasPage.css"
import ListaTareas from '../components/ListaTareas/ListaTareas'
import Form from '../components/Form/Form'
import { useTask } from '../hooks/useTaks'
import { useTasksLogic } from '../hooks/useTasksLogic'
import { EstadoTareas } from '../components/ListaTareas/EstadoTareas'
import { ProgresoBar } from '../components/ListaTareas/ProgresoBar'
import { tasksStore } from '../store/tasksStore'
import { ReciclajeTareas } from '../components/ListaTareas/ReciclajeTareas'

export const TareasPage = memo(() => {
  const { tasks,activeTasks, deletedTasks } = useTask()
  const tasksData = useTasksLogic(activeTasks)
  const deleteAllTasks = tasksStore(state => state.deleteAllTasks)


  const handleSendEmail = (deletedTasks) => {
    console.log("Enviar email con:", deletedTasks)
  }

  return (

    <section className="tasks-tab">

      <Title title="Tareas" />

      <div className='header-layout'>

        <div className='header-1'>


          <h3 >
            Tareas totales: {activeTasks.length}
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
        <ProgresoBar activeTasks={activeTasks}></ProgresoBar>

        <ReciclajeTareas
          deletedTasks={deletedTasks}
          onDeleteAll={deleteAllTasks}
          onSendEmail={handleSendEmail}
        />

      </div>

    </section>



  )
})
