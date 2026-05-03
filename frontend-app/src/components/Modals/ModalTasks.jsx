import { createPortal } from "react-dom"

export const ModalTasks = ({ children, onClose }) => {
  return createPortal(
    <div className="modal-overlay-tasks" onClick={onClose}>
      
      <div 
        className="modal-content-tasks"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

    </div>,
    document.getElementById("modal-root")
  )
}