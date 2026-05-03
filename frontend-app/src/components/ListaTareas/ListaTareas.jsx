import Tarea from './Tarea'
import { Paginacion } from './Paginacion'
import React from 'react'


const ListaTareas = ({elementsPerPage,...rest}) => {




  return (
    
    <React.Fragment>

      <div className='ulStyle'>

        {
          elementsPerPage.length > 0 ?
            elementsPerPage.map(task => { return <Tarea key={task.id} task={task}></Tarea> })
            : <h4>No hay tareas</h4>
        }
      </div>

      <Paginacion {...rest}></Paginacion>
    </React.Fragment>

  
  )
}
export default ListaTareas


