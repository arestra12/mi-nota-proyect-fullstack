import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import "./Tareas.css"
import { useFormulario } from '../../hooks/useForm'
import { tasksStore } from '../../store/tasksStore'
import { Modal } from '../Modals/Modal' // 👈 importa

const Tarea = ({ task }) => {
  const updateTask = tasksStore(state => state.updateTask)
  const deleteTask = tasksStore(state => state.deleteTask)
  const updateState = tasksStore(state => state.updateState)

  const { text, inputChange, setValues } = useFormulario({ text: task.text })

  const [openModal, setOpenModal] = useState(false)

  // 👇 abrir modal con valor actual
  const editar = () => {
    //setValues({ text: task.text })
    setOpenModal(true)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    updateTask({
      id: task.id,
      text: text,
      completed: task.completed
    })

    setOpenModal(false)
  }

  return (
    <div className='li'>

      {/* TEXTO */}
      <div className='textCrud'>
        {
          task.completed ?
            <FontAwesomeIcon onClick={() => updateState(task)} className='selectedClick' icon={faCheckSquare} />
            :
            <FontAwesomeIcon onClick={() => updateState(task)} className='selectedClick' icon={faSquare} />
        }

        <span>{task.text}</span>
      </div>

      {/* ICONOS */}
      <div className='iconCrud'>
        <FontAwesomeIcon className='selectedClick' onClick={editar} icon={faEdit} />
        <FontAwesomeIcon className='selectedClick' onClick={() => deleteTask(task.id)} icon={faTrash} />
      </div>

      {/* MODAL */}
      {
        openModal && (
          <Modal onClose={() => setOpenModal(false)}>

            <form onSubmit={onSubmit} className='modal-form'>
              <h3>Editar tarea</h3>

              <input name='text' value={text} onChange={inputChange} className='form-control' type="text" autoFocus/>

              <button className='btn btn-success btn-update'>Guardar</button>
            </form>

          </Modal>
        )
      }

    </div>
  )
}

export default Tarea