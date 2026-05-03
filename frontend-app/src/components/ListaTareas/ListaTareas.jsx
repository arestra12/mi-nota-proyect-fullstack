import Tarea from './Tarea'
import { Paginacion } from './Paginacion'
import React from 'react'


const ListaTareas = ({elementsPerPage,...rest}) => {

   const filteredTasks = elementsPerPage.filter(task => !task.isDeleted)



  return (
    
    <React.Fragment>

      <div className='ulStyle'>

        {
          filteredTasks.length > 0 ?
            filteredTasks.map(task => { return <Tarea key={task.id} task={task}></Tarea> })
            : <h4>No hay tareas</h4>
        }
      </div>

      <Paginacion {...rest}></Paginacion>
    </React.Fragment>

  
  )
}
export default ListaTareas


