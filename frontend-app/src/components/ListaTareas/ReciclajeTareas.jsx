import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEnvelope, faRecycle } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '../Modals/Modal'

export const ReciclajeTareas = ({ tasks, onDeleteAll, onSendEmail }) => {

  const [openModal, setOpenModal] = useState(false)

  // 🔥 SOLO eliminadas
  const deletedTasks = tasks.filter(t => t.isDeleted)

  return (
    <div className='recycle-container'>

      {/* CARD PRINCIPAL */}
      <div className='recycle-card' onClick={() => setOpenModal(true)}>

        <div className='recycle-icon'>
          <FontAwesomeIcon icon={faRecycle} />
        </div>

        <div className='recycle-info'>
          <h3>Papelera</h3>
          <p>{deletedTasks.length} tareas eliminadas</p>
        </div>

      </div>

      {/* MODAL */}
      {
        openModal && (
          <Modal onClose={() => setOpenModal(false)}>

            <div className='recycle-modal'>

              {/* HEADER */}
              <h2>🗑️ Tareas eliminadas</h2>

              {/* LISTA */}
              <div className='recycle-list'>
                {
                  deletedTasks.length > 0
                    ? deletedTasks.map(task => (
                        <div key={task.id} className='recycle-item'>
                          <span>{task.text}</span>
                        </div>
                      ))
                    : <p className='empty'>No hay tareas eliminadas</p>
                }
              </div>

              {/* BOTONES */}
              <div className='recycle-actions'>

                <button
                  className='btn-email'
                  onClick={() => onSendEmail(deletedTasks)}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  Enviar por correo
                </button>

                <button
                  className='btn-delete-all'
                  onClick={() => onDeleteAll()}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Eliminar todo
                </button>

              </div>

            </div>

          </Modal>
        )
      }

    </div>
  )
}