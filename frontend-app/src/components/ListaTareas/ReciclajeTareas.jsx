import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faFileLines, faRecycle } from '@fortawesome/free-solid-svg-icons'
import { ModalTasks } from '../Modals/ModalTasks'

import { exportToTxt } from "../../utils/exportTasks"

export const ReciclajeTareas = ({ deletedTasks, onDeleteAll, onSendEmail }) => {

  const [openModal, setOpenModal] = useState(false)

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
          <ModalTasks onClose={() => setOpenModal(false)}>

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
                  className='btn btn-back send-mail-modal'
                  onClick={() => exportToTxt(deletedTasks)}
                >
                  Exportar TXT
                  <FontAwesomeIcon icon={faFileLines} />
                </button>

                <button
                  className='btn btn-danger delete-modal'
                  onClick={() => onDeleteAll()}
                >
                  Eliminar todo
                  <FontAwesomeIcon icon={faTrash} />
                </button>

              </div>

            </div>

          </ModalTasks>
        )
      }

    </div>
  )
}