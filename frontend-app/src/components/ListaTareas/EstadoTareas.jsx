import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useTasksLogic } from '../../hooks/useTasksLogic'

export const EstadoTareas = ({tasksData}) => {

    const {obtenerEstado, setearEstado}=tasksData
  return (

 <>
 {
        obtenerEstado ?
          
          <button className='btn btn-filter' onClick={setearEstado}  >Ocultar Completadas <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon></button>
          : <button className='btn btn-filter' onClick={setearEstado}>Ver Completadas <FontAwesomeIcon icon={faEye}></FontAwesomeIcon></button>
      }
 
 </>




  )
}
